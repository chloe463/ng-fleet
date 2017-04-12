import {
  Component,
  OnInit,
  AfterContentInit,
  Input,
  Output,
  ContentChildren,
  QueryList,
  forwardRef
} from '@angular/core';
import { FrRadioComponent } from './radio.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {};

export const RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FrRadioGroupComponent),
  multi: true
};

@Component({
  selector: 'fr-radio-group',
  templateUrl: './radio-group.component.html',
  providers: [RADIO_GROUP_CONTROL_VALUE_ACCESSOR]
})
export class FrRadioGroupComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  @Input() name;

  @ContentChildren(FrRadioComponent) _radios: QueryList<FrRadioComponent>;

  private _innerValue: any;

  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;

  public isRippleOn: {[key: number]: boolean} = {};

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this._radios.forEach((radio, index) => {
      this.isRippleOn[index] = false;
    });
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

  _onChange() {}

  public turnOnRipple(index: number): void {
    this.isRippleOn[index] = true;
    setTimeout(() => {
      this.isRippleOn[index] = false;
    }, 1000);
  }
}
