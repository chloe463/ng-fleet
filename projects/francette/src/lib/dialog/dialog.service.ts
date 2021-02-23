import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  ReflectiveInjector,
  ViewContainerRef
} from '@angular/core';
import { Observable, Observer } from 'rxjs';

export class FrDialogContext<T> implements Observer<T> {

  constructor(
    private _onNext: Function,
    private _onError: Function,
    private _onComplete: Function,
    public  params?: any
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
  public dialogStack: Array<ComponentRef<any>> = [];

  constructor(private cfr: ComponentFactoryResolver) {}

  public isShow(): boolean {
    return this.dialogStack.length > 0;
  }

  public set(vcr: ViewContainerRef) {
    this.vcr = vcr;
  }

  public pop<T>(component: FunctionConstructor, extraParams?: any) {
    const componentFactory = this.cfr.resolveComponentFactory(component);

    const noop = () => {};
    const bindings = ReflectiveInjector.resolve([
      { provide: FrDialogContext, useValue: new FrDialogContext<T>(noop, noop, noop, extraParams) }
    ]);
    const contextInjector = this.vcr.parentInjector;
    const injector        = ReflectiveInjector.fromResolvedProviders(bindings, contextInjector);

    const componentRef = this.vcr.createComponent(componentFactory, this.vcr.length, injector);
    this.vcr.element.nativeElement.appendChild(componentRef.location.nativeElement);
    this.dialogStack.push(componentRef);
  }

  public open<T>(component: FunctionConstructor, extraParams?: any): Observable<T> {
    return new Observable<T>((observer: Observer<T>) => {
      const componentFactory = this.cfr.resolveComponentFactory(component);

      const _onNext = (value: T) => {
        if (componentRef) {
          if (observer.next) { observer.next(value); }
          if (observer.complete) { observer.complete(); }
          observer.closed = true;
          this.close(componentRef);
        }
      };
      const _onError = (reason?: any) => {
        if (componentRef) {
          if (observer.error) { observer.error(reason); }
          observer.closed = true;
          this.close(componentRef);
        }
      };
      const  _onComplete = (): void => {
        if (componentRef) {
          if (observer.complete) { observer.complete(); }
          observer.closed = true;
          this.close(componentRef);
        }
      };
      const bindings = ReflectiveInjector.resolve([
        { provide: FrDialogContext, useValue: new FrDialogContext<T>(_onNext, _onError, _onComplete, extraParams) }
      ]);
      const contextInjector = this.vcr.parentInjector;
      const injector        = ReflectiveInjector.fromResolvedProviders(bindings, contextInjector);

      const componentRef = this.vcr.createComponent(componentFactory, this.vcr.length, injector);
      this.vcr.element.nativeElement.appendChild(componentRef.location.nativeElement);
      this.dialogStack.push(componentRef);
    });
  }

  public close(componentRef?: ComponentRef<any>): void {
    if (!componentRef) {
      // If no componentRef is given, close the foremost dialog.
      componentRef = this.dialogStack.pop();
    } else {
      // Remove specified componentRef from stack
      this.dialogStack = this.dialogStack.filter((dialogRef) => {
        return dialogRef !== componentRef;
      });
    }

    // Delay for dialog leaving animation
    setTimeout(() => {
      if (componentRef) {
        componentRef.destroy();
        componentRef = undefined;
      }
    }, 500);
  }
}
