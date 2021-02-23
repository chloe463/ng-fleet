import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export class FrCheckboxChange {
  source: FrCheckboxComponent;
  value: any;
}

const noop = () => {};

const CHECKMARK_VOID      = 'VOID';
const CHECKMARK_UNCHECKED = 'UNCHECKED';
const CHECKMARK_CHECKED   = 'CHECKED';

export const CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FrCheckboxComponent),
  multi: true
};

@Component({
  selector: 'fr-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [CHECKBOX_CONTROL_VALUE_ACCESSOR],
  animations: [
    trigger('checkmarkState', [
      state(CHECKMARK_UNCHECKED, style({
        'stroke-width': '2.7px',
        'stroke': 'transparent',
        'stroke-dasharray': 0,
        'stroke-dashoffset': -30
      })),
      state(CHECKMARK_CHECKED, style({
        'stroke-width': '2.7px',
        'stroke': 'white',
        'stroke-dasharray': 100,
        'stroke-dashoffset': 0
      })),
      transition(`${CHECKMARK_UNCHECKED} => ${CHECKMARK_CHECKED}`, [
        style({
          'stroke-width': '2.7px'
        }),
        animate('360ms linear')
      ])
    ])
  ]
})
export class FrCheckboxComponent implements OnInit, ControlValueAccessor {

  @Input() label: string;
  @Input() name: string;

  @Output() change: EventEmitter<FrCheckboxChange> = new EventEmitter<FrCheckboxChange>();

  @HostBinding('class.fr-checkbox-host') checkboxHost =  true;

  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;
  private _isDisabled = false;
  private _indeterminate = false;

  public isRippleOn = false;
  public isFocused: boolean;

  @Input()
  set indeterminate(_indeterminate: boolean) {
    this._indeterminate = _indeterminate;
  }
  get indeterminate(): boolean {
    return this._indeterminate;
  }

  private _checkmarkState = CHECKMARK_VOID;

  get checkmarkState() {
    if (this._innerValue === null) {
      return CHECKMARK_VOID;
    }
    return this._innerValue ? CHECKMARK_CHECKED : CHECKMARK_UNCHECKED;
  }

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
    this.indeterminate = false;
    this.value = !this.value;
    this.isRippleOn = true;
    setTimeout(() => this.isRippleOn = false, 1000);

    event.stopPropagation();
    this.emitChangeEvent();
    this._onTouchedCallback();
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
