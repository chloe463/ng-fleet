import { $$ } from 'protractor';
import {
  Injectable,
  ViewContainerRef,
  ComponentFactoryResolver,
  ReflectiveInjector,
  ComponentRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { FrToasterContentComponent } from './toaster-entry.component';
import { FrToasterParam } from './toaster.types';

@Injectable()
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
          observer.complete && observer.complete();
          observer.closed = true;
          this.count--;
          componentRef.destroy();
        }
      }
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
