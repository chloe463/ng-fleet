import {
  Component,
  OnInit,
  Input,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface IFrSwitchLabels {
  on: string;
  off: string;
};

const noop = () => {};

export const SWITCH_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FrSwitchComponent),
  multi: true
};

@Component({
  selector: 'fr-switch',
  templateUrl: './switch.component.html',
  providers: [SWITCH_CONTROL_VALUE_ACCESSOR]
})
export class FrSwitchComponent implements OnInit, ControlValueAccessor {

  @Input() labels: IFrSwitchLabels;

  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: (_: any) => void = noop;

  public labelText: string;

  constructor() { }

  ngOnInit() {
    this.changeLabel();
  }

  get value(): any {
    return this._innerValue;
  }

  set value(obj: any) {
    if (obj !== undefined && obj !== this._innerValue) {
      this._innerValue = obj;
      this.changeLabel();
      this._onChangeCallback(obj);
      this._onTouchedCallback(obj);
    }
  }

  writeValue(obj: any): void {
    if (obj !== undefined && obj !== this._innerValue) {
      this._innerValue = obj;
      this.changeLabel();
      this._onChangeCallback(obj);
      this._onTouchedCallback(obj);
    }
  }

  registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  public toggle(): void {
    this.value = !this.value;
  }

  public changeLabel(): void {
    this.labelText = this.value ? this.labels.on : this.labels.off;
  }

}
