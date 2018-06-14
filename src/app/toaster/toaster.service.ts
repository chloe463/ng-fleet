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
  OnDestroy,
  AfterViewInit,
  ReflectiveInjector
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Observable, Observer, timer } from 'rxjs';
import { tap, delay, map } from 'rxjs/operators';
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

  public pop<T>(toasterParam: FrToasterParam) {
    const component = FrToasterContentComponent;
    const componentFactory = this.cfr.resolveComponentFactory(component);

    const noop = () => {};
    const bindings = ReflectiveInjector.resolve([
      { provide: FrToasterContext, useValue: new FrToasterContext(noop, noop, noop, toasterParam) }
    ]);
    const contextInjector = this.vcr.parentInjector;
    const injector = ReflectiveInjector.fromResolvedProviders(bindings, contextInjector);

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

  public open<T>(toasterParam: FrToasterParam): Observable<T> {
    console.warn('FrToasterService.open is DEPRECATED. Use FrToasterService.pop instead.');
    return new Observable<T>((observer: Observer<T>) => {
      const component = FrToasterContentComponent;
      const componentFactory = this.cfr.resolveComponentFactory(component);

      const _onNext = (value: T) => {
        if (componentRef) {
          if (observer.next) { observer.next(value); }
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
      const bindings = ReflectiveInjector.resolve([
        { provide: FrToasterContext, useValue: new FrToasterContext(_onNext, _onError, _onComplete, toasterParam) }
      ]);
      const contextInjector = this.vcr.parentInjector;
      const injector        = ReflectiveInjector.fromResolvedProviders(bindings, contextInjector);

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
export class FrToasterContentComponent<T> implements OnInit, OnDestroy {
  public text = '';
  public action = '';
  public timeout = 500;
  public closed = false;
  public toasterState = 'void';
  public onActionObserver: Observer<any>;
  constructor (@Inject(forwardRef(() => FrToasterContext)) private _context: FrToasterContext<T>) {
    this.text    = this._context.text;
    this.action  = this._context.action;
    this.timeout = this._context.timeout;
  }

  public emitAction(): void {
    this.closed = true;
    this.toasterState = 'void';
    this._context.next(<any>this.action as T);
    if (this.onActionObserver) {
      this.onActionObserver.next(this._context.action);
      this.onActionObserver.complete();
    }
  }

  ngOnInit() {
    this.toasterState = 'active';
  }

  ngOnDestroy() {
    this._context.complete();
    if (this.onActionObserver) {
      this.onActionObserver.complete();
    }
  }

  public onAction<T>(): Observable<T> {
    return new Observable<T>((observer: Observer<T>) => {
      this.onActionObserver = observer;
    });
  }
}
