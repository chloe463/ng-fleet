import {
  Component,
  Directive,
  OnInit,
  AfterContentInit,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  forwardRef,
  Optional,
  HostBinding
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { timer } from 'rxjs/observable/timer';

export class FrRadioChange {
  public source: FrRadioComponent | null;
  public value: any;
}

const noop = () => {};

export const RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FrRadioGroupComponent),
  multi: true
};

@Component({
  selector: 'fr-radio-group',
  template: `<ng-content></ng-content>`,
  providers: [RADIO_GROUP_CONTROL_VALUE_ACCESSOR]
})
export class FrRadioGroupComponent implements ControlValueAccessor {
  @Input() name;

  @Output() change: EventEmitter<FrRadioChange> = new EventEmitter<FrRadioChange>();

  @ContentChildren(forwardRef(() => FrRadioComponent)) _radios: QueryList<FrRadioComponent>;

  private _innerValue: any;
  private _selectedRadio: FrRadioComponent;

  public _onChangeCallback: (_: any) => void = noop;
  public _onTouchedCallback: () => void = noop;

  private _isDiabled = false;

  constructor() { }

  get value(): any {
    return this._innerValue;
  }

  set value(obj: any) {
    if (obj !== this._innerValue) {
      this._innerValue = obj;
      this._onChangeCallback(obj);
      this.selectOneByValue(obj);
    }
  }

  writeValue(obj: any): void {
    if (obj !== this._innerValue) {
      this.value = obj;
    }
  }

  registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDiabled = isDisabled;
  }

  set disabled(isDisabled: boolean) {
    this._isDiabled = isDisabled;
  }

  get disabled() {
    return this._isDiabled;
  }

  public emitChangeEvent(): void {
    const event  = new FrRadioChange();
    event.source = this._selectedRadio;
    event.value  = this.value;
    this.change.emit(event);
  }

  public selectOneByRadioComponent(selectedRadio: FrRadioComponent): void {
    this._selectedRadio = selectedRadio;
    if (!this._radios) { return; }
    this._radios.forEach((radio, index) => {
      if (radio !== selectedRadio) {
        radio.checked = false;
      }
    });
  }

  public selectOneByValue(value: any): void {
    if (!this._radios) { return; }
    this._radios.forEach((radio, index) => {
      radio.checked = (radio.value === value);
    });
  }
}

@Component({
  selector: 'fr-radio',
  templateUrl: '../radio/radio.component.html'
})
export class FrRadioComponent implements OnInit {

  @Input() value: string;
  @Input() checked: boolean;
  @Input() name: string;
  @Input() disabled: boolean;

  @Output() change: EventEmitter<FrRadioChange> = new EventEmitter<FrRadioChange>();

  @HostBinding('class.fr-radio-host') true;

  private radioGroup: FrRadioGroupComponent;
  public isRippleOn: boolean;
  public isFocused: boolean;

  constructor(@Optional() radioGroup: FrRadioGroupComponent) {
    this.radioGroup = radioGroup;
  }

  ngOnInit() {
    if (this.radioGroup) {
      this.name = this.radioGroup.name;
      this.disabled = this.radioGroup.disabled;
      this.checked = this.value === this.radioGroup.value;
    }
    this.isFocused = false;
  }

  private _eventChangeEvent(): void {
    const event  = new FrRadioChange();
    event.source = this;
    event.value  = this.value;
    this.change.emit(event);
  }

  public onInputClick(event: Event): void {
    event.stopPropagation();
    this.checked = true;
    this._eventChangeEvent();

    this.isRippleOn = true;
    timer(1000).subscribe(() => {
      this.isRippleOn = false;
    });

    if (this.radioGroup) {
      this.radioGroup.value = this.value;
      this.radioGroup._onChangeCallback(this.value);
      this.radioGroup.selectOneByRadioComponent(this);
      this.radioGroup.emitChangeEvent();
    }
  }

  public onInputChange(event: Event): void {
    event.stopPropagation();
  }

  public onFocus(event: Event): void {
    this.isFocused = true;
  }

  public onBlur(event: Event): void {
    this.isFocused = false;
  }
}
