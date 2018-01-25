import {
  Component,
  ComponentFactoryResolver,
  Directive,
  Inject,
  Injectable,
  ViewChild,
  ViewContainerRef,
  forwardRef,
  OnInit,
  OnChanges,
  AfterViewInit,
  animate,
  trigger,
  style,
  state,
  transition,
  HostListener,
  ReflectiveInjector,
  ComponentRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { timer } from 'rxjs/observable/timer';

import { FrToasterParam } from './toaster.types';

export class FrToasterContext<T> implements Observer<T> {
  constructor(
    private _onNext: Function,
    private _onError: Function,
    private _onComplete: Function,
    public toasterParam: FrToasterParam
  ) {}

  get text(): string {
    return this.toasterParam.text;
  }
  get action(): string {
    return this.toasterParam.action;
  }
  get timeout(): number {
    return this.toasterParam.timeout;
  }
  get params(): any {
    return this.toasterParam.params;
  }

  public next(value?: T) {
    this._onNext(value);
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

  public open<T>(toasterParam: FrToasterParam): Observable<T> {
    return new Observable<T>((observer: Observer<T>) => {
      const component = FrToasterContentComponent;
      const componentFactory = this.cfr.resolveComponentFactory(component);

      const _onNext = (value: T) => {
        if (componentRef) {
          if (observer.next) { observer.next(value); }
          if (observer.complete) { observer.complete(); }
          observer.closed = true;
          this.count--;
          componentRef.destroy();
        }
      };
      const _onError = (reason?: any) => {
        if (componentRef) {
          if (observer.error) { observer.error(reason); }
          if (observer.complete) { observer.complete(); }
          observer.closed = true;
          this.count--;
          componentRef.destroy();
        }
      };
      const _onComplete = (): void => {
        if (componentRef) {
          if (observer.complete) { observer.complete(); }
          observer.closed = true;
          this.count--;
          componentRef.destroy();
        }
      };
      const bindings = ReflectiveInjector.resolve([
        { provide: FrToasterContext, useValue: new FrToasterContext(_onNext, _onError, _onComplete, toasterParam) }
      ]);
      const contextInjector = this.vcr.parentInjector;
      const injector        = ReflectiveInjector.fromResolvedProviders(bindings, contextInjector);

      const componentRef = this.vcr.createComponent(componentFactory, this.vcr.length, injector);
      this.vcr.element.nativeElement.appendChild(componentRef.location.nativeElement);
      this.count++;
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
  @ViewChild(FrToasterInnerDirective) public inner: FrToasterInnerDirective;

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
export class FrToasterContentComponent implements OnInit {
  public text = '';
  public action = '';
  public timeout = 500;
  public closed = false;
  public toasterState = 'void';
  constructor (@Inject(forwardRef(() => FrToasterContext)) private _context: FrToasterContext<string|number>) {
    this.text    = this._context.text;
    this.action  = this._context.action;
    this.timeout = this._context.timeout;
  }

  public emitAction(): void {
    this.closed = true;
    this._context.next();
  }

  ngOnInit() {
    this.toasterState = 'active';

    // This is for animation
    timer(this.timeout - 300).subscribe(() => {
      if (!this.closed) {
        this.toasterState = 'void';
      }
    });
    // Close toaster after `timeout` milliseconds
    timer(this.timeout).subscribe(() => {
      if (!this.closed) {
        this._context.complete();
      }
    });
  }
}
