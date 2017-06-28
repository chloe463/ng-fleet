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
  Optional
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export class FrRadioChange {
  public source: FrRadioComponent | null;
  public value: any;
}

const noop = () => {};

export const RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FrRadioGroupDirective),
  multi: true
};

@Directive({
  selector: 'fr-radio-group',
  providers: [RADIO_GROUP_CONTROL_VALUE_ACCESSOR]
})
export class FrRadioGroupDirective implements ControlValueAccessor {
  @Input() name;

  @Output() change: EventEmitter<FrRadioChange> = new EventEmitter<FrRadioChange>();

  @ContentChildren(forwardRef(() => FrRadioComponent)) _radios: QueryList<FrRadioComponent>;

  private _innerValue: any;
  private _selectedRadio: FrRadioComponent;

  public _onChangeCallback: (_: any) => void = noop;
  public _onTouchedCallback: () => void = noop;

  private _isDiabled: boolean = false;

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

  public selectOne(selectedRadio: FrRadioComponent): void {
    this._selectedRadio = selectedRadio;
    this._radios.forEach((radio, index) => {
      if (radio !== selectedRadio) {
        radio.checked = false;
      }
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

  @Output() change: EventEmitter<FrRadioChange> = new EventEmitter<FrRadioChange>();

  private radioGroup: FrRadioGroupDirective;
  public isRippleOn: boolean;

  constructor(@Optional() radioGroup: FrRadioGroupDirective) {
    this.radioGroup = radioGroup;
  }

  ngOnInit() {
    if (this.radioGroup) {
      this.name = this.radioGroup.name;
    }
  }

  private _eventChangeEvent(): void {
    const event  = new FrRadioChange();
    event.source = this;
    event.value  = this.value;
    this.change.emit(event);
  }

  public onInputClick(event: Event): void {
    event.stopPropagation();
  }

  public onInputChange(event: Event): void {
    event.stopPropagation();
    this.checked = true;
    this._eventChangeEvent();

    this.isRippleOn = true;
    setTimeout(() => {
      this.isRippleOn = false;
    }, 1000);

    if (this.radioGroup) {
      this.radioGroup.value = this.value;
      this.radioGroup._onChangeCallback(this.value);
      this.radioGroup.selectOne(this);
      this.radioGroup.emitChangeEvent();
    }
  }
}
