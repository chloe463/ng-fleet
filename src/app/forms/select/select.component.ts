import {
  Component,
  OnInit,
  Input,
  ContentChildren,
  QueryList,
  forwardRef,
  ElementRef,
  HostListener,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { FrOptionComponent } from './option.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface IFrDropDownOption {
  value: any;
  label: string | number;
}

const noop = () => {};

export const SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FrSelectComponent),
  multi: true
};

@Component({
  selector: 'fr-select',
  templateUrl: './select.component.html',
  providers: [SELECT_CONTROL_VALUE_ACCESSOR],
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
export class FrSelectComponent implements OnInit, ControlValueAccessor {
  @Input() name: string;
  @Input() placeholder: string | number;

  @ContentChildren(FrOptionComponent) _options: QueryList<FrOptionComponent>;

  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;
  private _isDisabled = false;

  public optionsVisibility: boolean;
  public label: string | number;
  private _state: string = 'placeholder';

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.optionsVisibility = false;
  }

  public onChange(value): void {
    this.value = value;
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

  public toggleOptionsVisiblity(): void {
    this.optionsVisibility = !this.optionsVisibility;
    this.onFocus();
  }

  public select(option) {
    this.value = option;
    this.label = option.label;
    this.optionsVisibility = false;
    this.state = 'label';
  }

  public isSelected(option) {
    return this.value === option;
  }

  @HostListener('document:click', ['$event'])
  disappear(event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.optionsVisibility = false;
      this.onBlur();
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

  public onBlur() {
    if (!this.value) {
      this.state = 'placeholder';
      return;
    }
    this.state = 'label';
  }
}
