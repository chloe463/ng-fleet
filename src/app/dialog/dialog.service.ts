import {
  Injectable,
  ViewContainerRef,
  ComponentFactoryResolver,
  ReflectiveInjector,
  ComponentRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class FrDialogContext<T> implements Observer<T> {

  constructor(
    private _onNext: Function,
    private _onError: Function,
    private _onComplete: Function
  ) { }

  public next(val?: any): void {
    this._onNext(val);
  }

  public error(reason?: any): void {
    this._onError(reason);
  }

  public complete(): void {
    this._onComplete();
  }
}

@Injectable()
export class FrDialogService {
  public vcr: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  public count = 0;

  constructor(private cfr: ComponentFactoryResolver) {}

  public isShow(): boolean {
    return this.count > 0;
  }

  public set(vcr: ViewContainerRef) {
    this.vcr = vcr;
  }

  public open<T>(component): Observable<T> {
    return new Observable<T>((observer: Observer<T>) => {
      const componentFactory = this.cfr.resolveComponentFactory(component);

      const _onNext = (value: T) => {
        if (this.componentRef) {
          observer.next(value);
          observer.complete();
          observer.closed = true;
          this.close();
        }
      }
      const _onError = (reason?: any) => {
        if (this.componentRef) {
          observer.error(reason);
          observer.complete();
          observer.closed = true;
          this.close();
        }
      }
      const  _onComplete = (): void => {
        if (this.componentRef) {
          observer.complete();
          observer.closed = true;
          this.close();
        }
      }
      const bindings = ReflectiveInjector.resolve([
        { provide: FrDialogContext, useValue: new FrDialogContext<T>(_onNext, _onError, _onComplete) }
      ]);
      const contextInjector = this.vcr.parentInjector;
      const injector        = ReflectiveInjector.fromResolvedProviders(bindings, contextInjector);

      this.componentRef = this.vcr.createComponent(componentFactory, this.vcr.length, injector);
      this.vcr.element.nativeElement.appendChild(this.componentRef.location.nativeElement);
      this.count++;
    });
  }

  public close(): void {
    if (this.componentRef) {
      this.count--;
      // Delay for dialog leaving animation
      setTimeout(() => {
        this.componentRef.destroy();
        this.componentRef = undefined;
      }, 500);
    }
  }
}
