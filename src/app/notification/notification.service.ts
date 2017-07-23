import {
  Injectable,
  ViewContainerRef,
  ComponentFactoryResolver,
  ReflectiveInjector,
  ComponentRef
} from '@angular/core';
import { FrNotificationContentComponent } from './notification-entry.component';
import { FrNotificationType, FrNotificationParam } from './notification.types';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
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
  public count: number = 0;

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
          observer.next && observer.next(value);
          observer.complete && observer.complete();
          observer.closed = true;
          this.count--;
          componentRef.destroy();
        }
      };
      const _onError = (reason?: any) => {
        if (componentRef) {
          observer.error && observer.error(reason);
          observer.complete && observer.complete();
          observer.closed = true;
          this.count--;
          componentRef.destroy();
        }
      }
      const _onComplete = (): void => {
        if (componentRef) {
          observer && observer.complete();
          observer.closed = true;
          this.count--;
          componentRef.destroy();
        }
      }
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
