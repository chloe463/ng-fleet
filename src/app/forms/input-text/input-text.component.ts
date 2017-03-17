import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ElementRef,
  HostListener,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
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
  styleUrls: ['./input-text.component.scss'],
  providers: [INPUT_TEXT_CONTROL_VALUE_ACCESSOR],
  animations: [
    trigger('labelState', [
      state('placeholder', style({
        top: '5px',
        left: '3px',
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
export class FrInputTextComponent implements OnInit, ControlValueAccessor {

  @Input() name: string;
  @Input() placeholder: string;

  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;
  private _isDisabled = false;

  private _state: string = 'placeholder';

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

  public updateValue(value) {
    this.value = value;
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

  public onBlur() {
    if (!this.value.length) {
      this.state = 'placeholder';
      return;
    }
    this.state = 'label';
  }
}
