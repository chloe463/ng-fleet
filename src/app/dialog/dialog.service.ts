import {
  Injectable,
  ViewContainerRef,
  ComponentFactoryResolver,
  ReflectiveInjector,
  ComponentRef
} from '@angular/core';

@Injectable()
export class FrDialogContext {

  constructor(
    private _resolve: Function,
    private _reject: Function
  ) { }

  public resolve(val?: any): void {
    this._resolve(val);
  }

  public reject(reason?: any): void {
    this._reject(reason);
  }
}

export interface IFrDialogSize {
  width: number;
  height: number;
}

@Injectable()
export class FrDialogService {
  public vcr: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  public count = 0;

  private _size: IFrDialogSize = { width: 640, height: 320 };
  get size() {
    return this._size;
  }
  set size(size) {
    this._size = size;
  }

  constructor(private cfr: ComponentFactoryResolver) {}

  public isShow(): boolean {
    return this.count > 0;
  }

  public set(vcr: ViewContainerRef) {
    this.vcr = vcr;
  }

  public open<T>(component, size?: IFrDialogSize): Promise<T> {
    if (size) {
      this.size = size;
    }
    return new Promise<T>((resolve, reject) => {
      const componentFactory = this.cfr.resolveComponentFactory(component);

      const _resolve = (value: T) => {
        if (this.componentRef) {
          resolve(value);
          this.close();
        }
      };

      const _reject = (reason?: any) => {
        if (this.componentRef) {
          reject(reason);
          this.close();
        }
      };

      const bindings = ReflectiveInjector.resolve([
        { provide: FrDialogContext, useValue: new FrDialogContext(_resolve, _reject) }
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
      this.componentRef.destroy();
      this.componentRef = undefined;
      this.count--;
    }
  }
}
