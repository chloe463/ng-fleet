import {
  Component,
  Directive,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  forwardRef
} from '@angular/core';
import { DefaultValueAccessor } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { timer } from 'rxjs/observable/timer';

export class FrCheckboxChange {
  source: FrCheckboxComponent;
  value: any;
}

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

  @Output() change: EventEmitter<FrCheckboxChange> = new EventEmitter<FrCheckboxChange>();

  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;
  private _isDisabled: boolean = false;

  public isRippleOn = false;
  public isFocused: boolean;

  constructor() { }

  ngOnInit() {
    this.value = false;
    this.isFocused = false;
  }

  private emitChangeEvent(): void {
    const event = new FrCheckboxChange();
    event.source = this;
    event.value  = this.value;
    this.change.emit(event);
  }

  public onchange(event: Event) {
    event.stopPropagation();
  }

  public onClick(event: Event) {
    if (this.disabled) {
      return;
    }
    this.value = !this.value;
    this.isRippleOn = true;
    timer(1000).subscribe(() => {
      this.isRippleOn = false;
    })

    event.stopPropagation();
    this.emitChangeEvent();
  }

  public onFocus(event: Event): void {
    this.isFocused = true;
  }

  public onBlur(event: Event): void {
    this.isFocused = false;
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

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  set disabled(isDisabled) {
    this._isDisabled = isDisabled;
  }

  get disabled() {
    return this._isDisabled;
  }
}
