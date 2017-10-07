import {
  Component,
  OnInit,
  AfterContentChecked,
  Input,
  forwardRef,
  ElementRef,
  HostListener
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {};

export const INPUT_TEXT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FrInputTextComponent),
  multi: true
};

@Component({
  selector: 'fr-input-text',
  templateUrl: './input-text.component.html',
  providers: [INPUT_TEXT_CONTROL_VALUE_ACCESSOR],
  animations: [
    trigger('labelState', [
      state('placeholder', style({
        top: '5px',
        left: '0',
        color: '#CCCCCC'
      })),
      state('label', style({
        top: '-10px',
        left: '0px',
        color: '#CCCCCC',
        'font-size': '12px'
      })),
      state('labelOnFocus', style({
        top: '-10px',
        left: '0px',
        color: '#D33682',
        'font-size': '12px'
      })),
      transition('placeholder => labelOnFocus, labelOnFocus => placeholder, labelOnFocus => label, label => labelOnFocus', [
        animate('200ms ease-out')
      ])
    ])
  ]
})
export class FrInputTextComponent implements OnInit, AfterContentChecked, ControlValueAccessor {

  @Input() name: string;
  @Input() placeholder: string;

  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;
  private _isDisabled = false;

  private _state = 'placeholder';

  get value(): any {
    return this._innerValue;
  }

  set value(obj: any) {
    if (obj !== this._innerValue) {
      this._innerValue = obj;
      this._onChangeCallback(obj);
    }
  }

  get disabled(): boolean {
    return this._isDisabled;
  }

  set disabled(isDisabled: boolean) {
    this._isDisabled = isDisabled;
  }

  writeValue(obj: any): void {
    if (obj !== this._innerValue) {
      this._innerValue = obj;
      this._onChangeCallback(obj);
    }
  }

  registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  setDisableState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked () {
    if (this.value !== undefined && this.value !== '' && this.state !== 'labelOnFocus') {
      this.state = 'label';
    }
  }

  get state(): string {
    return this._state;
  }

  set state(newState) {
    this._state = newState;
  }

  public onFocus() {
    this.state = 'labelOnFocus';
  }

  public onBlur(value) {
    this.value = value;
    if (!value.length) {
      this.state = 'placeholder';
      return;
    }
    this.state = 'label';
  }
}
