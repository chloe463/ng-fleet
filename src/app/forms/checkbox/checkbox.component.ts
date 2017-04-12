import {
  Component,
  Directive,
  OnInit,
  Input,
  ContentChildren,
  QueryList,
  forwardRef
} from '@angular/core';
import { DefaultValueAccessor } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {};

export const CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FrCheckboxComponent),
  multi: true
};

@Component({
  selector: 'fr-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [CHECKBOX_CONTROL_VALUE_ACCESSOR]
})
export class FrCheckboxComponent implements OnInit, ControlValueAccessor {

  @Input() label: string;
  @Input() name: string;

  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;

  public isRippleOn = false;

  constructor() { }

  ngOnInit() {
    this.value = false;
  }

  public onClick() {
    this.value = !this.value;
    this.isRippleOn = true;
    setTimeout(() => {
      this.isRippleOn = false;
    }, 1000);
  }

  get value(): any {
    return this._innerValue;
  }

  set value(obj: any) {
    if (obj !== this._innerValue) {
      this._innerValue = obj;
      this._onChangeCallback(obj);
    }
  }

  writeValue(obj: any): void {
    if (obj !== this._innerValue) {
      this._innerValue = obj;
    }
  }

  registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  setDisableState(isDisabled: boolean): void {
  }
}
