import {
  Injectable,
  ViewContainerRef,
  ComponentFactoryResolver,
  ReflectiveInjector,
  ComponentRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { timer } from 'rxjs/Observable/timer';

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

  public open<T>(component, extraParams?: any): Observable<T> {
    return new Observable<T>((observer: Observer<T>) => {
      const componentFactory = this.cfr.resolveComponentFactory(component);

      const _onNext = (value: T) => {
        if (componentRef) {
          observer.next && observer.next(value);
          observer.complete && observer.complete();
          observer.closed = true;
          this.close(componentRef);
        }
      }
      const _onError = (reason?: any) => {
        if (componentRef) {
          observer.error && observer.error(reason);
          observer.complete && observer.complete();
          observer.closed = true;
          this.close(componentRef);
        }
      }
      const  _onComplete = (): void => {
        if (componentRef) {
          observer.complete && observer.complete();
          observer.closed = true;
          this.close(componentRef);
        }
      }
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
    // If no componentRef is given, close the foremost dialog.
    if (!componentRef) {
      componentRef = this.dialogStack.pop();
    }
    // Remove specified componentRef from stack
    else {
      this.dialogStack = this.dialogStack.filter((dialogRef) => {
        return dialogRef !== componentRef;
      });
    }

    // Delay for dialog leaving animation
    timer(500).subscribe(() => {
      componentRef.destroy();
      componentRef = undefined;
    })
  }
}
