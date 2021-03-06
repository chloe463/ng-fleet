import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Directive,
  forwardRef,
  Inject,
  Injectable,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Observable, Observer, timer } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { FrToasterParam } from './toaster.types';

export class FrToasterContext implements Observer<void> {
  constructor(
    private _onNext: Function,
    private _onError: Function,
    private _onComplete: Function,
    public toasterParam: FrToasterParam
  ) {}

  get text(): string {
    return this.toasterParam.text;
  }
  get action(): string | undefined {
    return this.toasterParam.action;
  }
  get timeout(): number | undefined {
    return this.toasterParam.timeout;
  }

  public next() {
    this._onNext();
  }

  public error(reason?: any) {
    this._onError(reason);
  }

  public complete() {
    this._onComplete();
  }
}

@Injectable()
export class FrToasterService {
  public vcr: ViewContainerRef;
  public count = 0;

  constructor(public cfr: ComponentFactoryResolver) {}

  public isShow(): boolean {
    return this.count > 0;
  }

  public set(vcr: ViewContainerRef) {
    this.vcr = vcr;
  }

  public pop(toasterParam: FrToasterParam) {
    const component = FrToasterContentComponent;
    const componentFactory = this.cfr.resolveComponentFactory(component);

    const noop = () => {};
    const injector = Injector.create({
      providers: [
        { provide: FrToasterContext, useValue: new FrToasterContext(noop, noop, noop, toasterParam) }
      ]
    });

    const componentRef = this.vcr.createComponent(componentFactory, this.vcr.length, injector);
    this.vcr.element.nativeElement.appendChild(componentRef.location.nativeElement);
    this.count++;

    // Destroy toaster component with animation
    timer((toasterParam.timeout || 3000) - 300).pipe(
      tap(_ => componentRef.instance.toasterState = 'void'),
      delay(300)  // This is for animation
    ).subscribe(() => {
      componentRef.destroy();
    });

    return componentRef.instance;
  }

  public open(toasterParam: FrToasterParam): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      const component = FrToasterContentComponent;
      const componentFactory = this.cfr.resolveComponentFactory(component);

      const _onNext = () => {
        if (componentRef) {
          if (observer.next) { observer.next(); }
          observer.closed = true;
          this.count--;
        }
      };
      const _onError = (reason?: any) => {
        if (componentRef) {
          if (observer.error) { observer.error(reason); }
          observer.closed = true;
          this.count--;
        }
      };
      const _onComplete = (): void => {
        if (componentRef) {
          if (observer.complete) { observer.complete(); }
          observer.closed = true;
          this.count--;
        }
      };
      const injector = Injector.create({
        providers: [
          { provide: FrToasterContext, useValue: new FrToasterContext(_onNext, _onError, _onComplete, toasterParam) }
        ]
      });

      const componentRef = this.vcr.createComponent(componentFactory, this.vcr.length, injector);
      this.vcr.element.nativeElement.appendChild(componentRef.location.nativeElement);
      this.count++;

      // Destroy component after `toasterParam.timeout` milliseconds
      timer((toasterParam.timeout || 3000) - 300).pipe(
        tap(_ => componentRef.instance.toasterState = 'void'),
        delay(300)    // This is for animation
      ).subscribe(() => {
        componentRef.destroy();
      });
    });
  }
}

@Directive({
  selector: '[frToasterInner]'
})
export class FrToasterInnerDirective {
  constructor (public vcr: ViewContainerRef) { }
}

@Component({
  selector: 'fr-toaster-entry',
  template: `
<div class="fr-toaster__container">
  <div frToasterInner></div>
</div>
  `,
  styles: [`
  .fr-toaster__container {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    justify-content: center;
  }
  [fr-toaster-inner] {
    color: #FFFFFF;
    border-radius: 2px;
  }
  `],
  animations: []
})
export class FrToasterEntryComponent implements AfterViewInit {
  @ViewChild(FrToasterInnerDirective, { static: true }) public inner: FrToasterInnerDirective;

  private _toasterState = 'void';

  get toasterState(): string {
    return this.toaster.isShow() ? 'active' : 'void';
  }

  set toasterState(newState) {
    this._toasterState = newState;
  }

  constructor (@Inject(forwardRef(() => FrToasterService)) public toaster: FrToasterService) {}

  ngAfterViewInit() {
    this.toaster.vcr = this.inner.vcr;
  }

  public isShow(): boolean {
    return this.toaster.isShow();
  }
}

@Component({
  selector: 'fr-toaster-content',
  template: `
<div class="fr-toaster__content-wrapper" [@toasterState]="toasterState">
  <div class="fr-toaster__content">
    {{text}}
  </div>
  <div class="fr-toaster__action" (click)="emitAction()">
    {{action}}
  </div>
</div>
  `,
  styles: [`
  .fr-toaster__content-wrapper {
    background: #323232;
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
    min-width: 288px;
    max-width: 568px;
  }
  `],
  animations: [
    trigger('toasterState', [
      state('void', style({
        transform: 'translateY(100%)'
      })),
      state('active', style({
        transform: 'translateY(0%)'
      })),
      transition('* => *', [
        animate('300ms ease-out')
      ]),
    ])
  ]
})
export class FrToasterContentComponent implements OnInit, OnDestroy {
  public text = '';
  public action = '';
  public timeout = 500;
  public closed = false;
  public toasterState = 'void';
  constructor (@Inject(forwardRef(() => FrToasterContext)) private _context: FrToasterContext) {
    this.text    = this._context.text;
    this.action  = this._context.action || '';
    this.timeout = this._context.timeout || 500;
  }

  public emitAction(): void {
    this.closed = true;
    this.toasterState = 'void';
    this._context.next();
  }

  ngOnInit() {
    this.toasterState = 'active';
  }

  ngOnDestroy() {
    this._context.complete();
  }
}
