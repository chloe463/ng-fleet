import {
  Component,
  OnInit,
  AfterContentInit,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
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
import { NgModel } from '@angular/forms';
import { FrOptionComponent } from './option.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export class FrSelectChange {
  source: FrSelectComponent;
  value: any;
}

const noop = () => {};

const HIDDEN         = 'hidden';
const VISIBLE        = 'visible';
const PLACEHOLDER    = 'placeholder';
const LABEL_ON_FOCUS = 'labelOnFocus';
const LABEL          = 'label';

export const SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FrSelectComponent),
  multi: true
};

@Component({
  selector: 'fr-select',
  templateUrl: './select.component.html',
  providers: [SELECT_CONTROL_VALUE_ACCESSOR]
})
export class FrSelectComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  @Input() name: string;
  @Input() placeholder: string;
  @Input() browserNative: boolean;

  @Output() change: EventEmitter<FrSelectChange> = new EventEmitter<FrSelectChange>();

  @ContentChildren(FrOptionComponent) options: QueryList<FrOptionComponent> = new QueryList<FrOptionComponent>();

  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;
  private _isDisabled = false;

  public optionsVisibility = HIDDEN;
  public label: string;
  public labelState = PLACEHOLDER;
  public isFocused  = false;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.optionsVisibility = HIDDEN;
  }

  ngAfterContentInit() {
    this.label      = '';
    this.labelState = PLACEHOLDER;
    const selectedOption = this.options.find(option => {
      return this.value === option.value;
    });
    if (!selectedOption) { return; }
    this.label = selectedOption.label;
    this.onBlur();
  }

  public onChange(value): void {
    this.value      = value;
    this.labelState = LABEL;
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
    this.label      = '';
    this.labelState = PLACEHOLDER;

    const selectedOption = this.options.find(option => {
      return option.value === obj;
    });
    if (!selectedOption) { return; }
    this.label = selectedOption.label;
    this.onBlur();
  }

  registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.optionsVisibility = HIDDEN;
    this.onBlur();
    this._isDisabled = isDisabled;
  }

  private emitChange(): void {
    const event = new FrSelectChange();
    event.source = this;
    event.value  = this.value;
    this.change.emit(event);
  }

  public toggleOptionsVisiblity(): void {
    if (this.disabled) {
      return;
    }
    this.optionsVisibility = (this.optionsVisibility === VISIBLE) ? HIDDEN : VISIBLE;
    this.onFocus();
  }

  public select(option, event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.value             = option.value;
    this.label             = option.label;
    this.optionsVisibility = HIDDEN;
    this.labelState        = LABEL;
    this.emitChange();
  }

  public isSelected(value) {
    return this.value === value;
  }

  @HostListener('document:click', ['$event'])
  disappear(event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.optionsVisibility = HIDDEN;
      this.onBlur();
    }
  }

  // TODO: Make it possible to select value with arrow keys
  // @HostListener('document:keydown', ['$event'])
  // selectOnKeyDown(event: KeyboardEvent): void {
  //   if (!this.isFocused) {
  //     return;
  //   }
  //   if (event.key === 'ArrowUp') {
  //     console.log(event);
  //   } else if (event.key === 'ArrowDown') {
  //     console.log(event);
  //   }
  // }

  public onFocus(event?: Event) {
    this.labelState = LABEL_ON_FOCUS;
    this.isFocused = true;
    if (this.optionsVisibility === HIDDEN) {
      this.optionsVisibility = VISIBLE;
    }
  }

  public onBlur(event?: Event) {
    this.isFocused = false;
    this.optionsVisibility = HIDDEN;
    if (this.value === null || this.value === undefined || this.value === '') {
      this.label = '';
      this.labelState = PLACEHOLDER;
      return;
    }
    this.labelState        = LABEL;
    this.optionsVisibility = HIDDEN;
  }
}
