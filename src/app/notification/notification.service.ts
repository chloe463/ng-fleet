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
  AfterViewInit,
  ReflectiveInjector
} from '@angular/core';
import {
  AnimationEvent,
  animate,
  trigger,
  style,
  state,
  transition
} from '@angular/animations';
import { FrNotificationType, FrNotificationParam } from './notification.types';
import { Observable, Observer } from 'rxjs';

export class FrNotificationContext<T> implements Observer<T> {
  constructor(
    private _onNext: Function,
    private _onError: Function,
    private _onComplete: Function,
    public notificationParam: FrNotificationParam
  ) {}

  get text(): string {
    return this.notificationParam.text;
  }
  get type(): FrNotificationType {
    return this.notificationParam.type ? this.notificationParam.type : 'default';
  }
  get timeout(): number {
    return this.notificationParam.timeout;
  }
  get extraParam(): any {
    return this.notificationParam.extraParams;
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
export class FrNotificationService {
  public vcr: ViewContainerRef;
  public count = 0;

  constructor(public cfr: ComponentFactoryResolver) { }

  public isShow(): boolean {
    return this.count > 0;
  }

  public set(vcr: ViewContainerRef) {
    this.vcr = vcr;
  }

  public open<T>(notificationParam: FrNotificationParam): Observable<T> {
    return new Observable<T>((observer: Observer<T>) => {
      const component = FrNotificationContentComponent;
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
        { provide: FrNotificationContext, useValue: new FrNotificationContext(_onNext, _onError, _onComplete, notificationParam) }
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
  selector: '[frNotificationInner]'
})
export class FrNotificationInnerDirective {
  constructor (public vcr: ViewContainerRef) { }
}

@Component({
  selector: 'fr-notification-entry',
  template: `
<div class="fr-notification-container">
  <div frNotificationInner></div>
</div>
  `,
  styles: [`
  .fr-notification-container {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1050;
  }
  [fr-notification-inner] {
    display: flex;
    flex-direction: column;
    margin: 6px;
  }
  `],
  animations: []
})
export class FrNotificationEntryComponent implements AfterViewInit {
  @ViewChild(FrNotificationInnerDirective) public inner: FrNotificationInnerDirective;

  constructor (@Inject(forwardRef(() => FrNotificationService)) public notification: FrNotificationService) {}

  ngAfterViewInit() {
    this.notification.vcr = this.inner.vcr;
  }

  public isShow(): boolean {
    return this.notification.isShow();
  }
}

@Component({
  selector: 'fr-notification-content',
  template: `
<div class="fr-notification"
  [ngClass]="notificationType"
  (@notificationState.done)="dismiss($event)"
  [@notificationState]="notificationState"
  (click)="next($event)">
  <div class="fr-notification__text">
    {{text}}
  </div>
  <span class="fr-notification__close-btn" (click)="close($event)">
    &times;
  </span>
</div>
  `,
  styles: [`
  .fr-notification {
    position: relative;
    margin: 12px;
    background: #323232;
    border-radius: 2px;
    min-width: 288px;
    max-width: 568px;
    color: #FFFFFF;
    box-shadow: 0 2px 10px rgba(0,0,0,.26);
    opacity: .98;
    cursor: pointer;
  }
  .fr-notification__text {
    margin: 14px 24px;
    display: inline-block;
  }
  .fr-notification__close-btn {
    position: absolute;
    right: 8px;
    top: 3px;
    cursor: pointer;
    width: 15px;
    height: 15px;
    line-height: 13px;
    text-align: center;
    vertical-align: middle;
  }
  .fr-notification__close-btn:hover {
    background: #323232;
    color: #FFFFFF;
  }
  .fr-notification--default { background: #EAEAEA; color: #434343; }
  .fr-notification--primary { background: #352838; }
  .fr-notification--info { background: #78BB5C; }
  .fr-notification--warning { background: #F1B224; color: #434343; }
  .fr-notification--danger { background: #D04B63; }
  `],
  animations: [
    trigger('notificationState', [
      state('void', style({
        transform: 'translateY(100%)'
      })),
      state('active', style({
        transform: 'translateY(0%)'
      })),
      transition('void => active', [
        animate('300ms ease-out')
      ]),
      transition('active => void', [
        animate('200ms ease-out', style({
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class FrNotificationContentComponent implements OnInit {
  public text = '';
  public timeout = 500;
  public closed = false;

  public notificationState = 'void';
  public notificationType: any;
  constructor (@Inject(forwardRef(() => FrNotificationContext)) private _context: FrNotificationContext<string|number>) {
    this.text    = this._context.text;
    this.timeout = this._context.timeout;
    this.notificationType = 'fr-notification--' + this._context.type;
  }

  public next(event: MouseEvent): void {
    this._context.next();
  }

  public close(event: MouseEvent): void {
    event.stopPropagation();
    this.notificationState = 'void';
  }

  public dismiss(event: AnimationEvent): void {
    if (event.fromState === 'active' && event.toState === 'void') {
      if (!this.closed) {
        this._context.complete();
      }
    }
  }

  ngOnInit() {
    this.notificationState = 'active';

    // This is for animation
    setTimeout(() => {
      if (!this.closed) {
        this.notificationState = 'void';
      }
    }, this.timeout - 500);
  }
}
