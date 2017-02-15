import {
  Component,
  OnInit,
  Input,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface IFrTime {
  hour: number;
  minute: number;
  second: number;
}

const noop = () => {};

export const TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FrTimePickerComponent),
  multi: true
};

@Component({
  selector: 'fr-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: [],
  providers: [TIME_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class FrTimePickerComponent implements OnInit, ControlValueAccessor {

  @Input() showSeconds: boolean;

  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;

  public model: IFrTime;

  constructor() { }

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
    if (obj !== null && obj !== this._innerValue) {
      this._innerValue = obj;
      this.model = {
        hour: obj.hour,
        minute: obj.minute,
        second: obj.second
      };
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

  ngOnInit() {
    this.resetModel();
  }

  public resetModel(): void {
    const now   = new Date();
    this.model = {
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds()
    };
    this.value = this.model;
  }

  public change(): void {
    this.value = {
      hour: this.model.hour,
      minute: this.model.minute,
      second: this.model.second
    };
  }

  /**
   * Add 1 hour
   */
  public addHour(): void {
    this.model.hour = (this.model.hour + 1) % 24;
    this.change();
  }

  /**
   * Subtract 1 hour
   */
  public subHour(): void {
    this.model.hour = (this.model.hour - 1 + 24) % 24;
    this.change();
  }

  /**
   * Add 1 minute
   */
  public addMinute(): void {
    this.model.minute = (this.model.minute + 1) % 60;
    this.change();
  }

  /**
   * Subtract 1 minute
   */
  public subMinute(): void {
    this.model.minute = (this.model.minute - 1 + 60) % 60;
    this.change();
  }

  /**
   * Add 1 second
   */
  public addSecond(): void {
    this.model.second = (this.model.second + 1) % 60;
    this.change();
  }

  /**
   * Subtract 1 second
   */
  public subSecond(): void {
    this.model.second = (this.model.second - 1 + 60) % 60;
    this.change();
  }
}
