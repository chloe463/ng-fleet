import {
  Component,
  OnInit,
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

interface IFrDropDownOption {
  value: any;
  label: string | number;
}

export class FrSelectChange {
  source: FrSelectComponent;
  value: any;
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
  providers: [SELECT_CONTROL_VALUE_ACCESSOR]
})
export class FrSelectComponent implements OnInit, ControlValueAccessor {
  @Input() name: string;
  @Input() placeholder: string | number;
  @Input() browserNative: boolean;

  @Output() change: EventEmitter<FrSelectChange> = new EventEmitter<FrSelectChange>();

  @ContentChildren(FrOptionComponent) _options: QueryList<FrOptionComponent> = new QueryList<FrOptionComponent>();

  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;
  private _isDisabled = false;

  public optionsVisibility: string = 'hidden';
  public label: string | number;
  public labelState: string = 'placeholder';
  public isFocused: boolean = false;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.optionsVisibility = 'hidden';
  }

  public onChange(value): void {
    this.value      = value;
    this.labelState = 'label';
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
    let found = false;
    this._options.forEach((option) => {
      if (option.value === obj) {
        this.label = option.label;
        this.onBlur();
        found = true;
      }
    });
    if (!found) {
      this.label = '';
      this.labelState = 'placeholder';
    }
  }

  registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.optionsVisibility = 'hidden';
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
    this.optionsVisibility = (this.optionsVisibility === 'show') ? 'hidden': 'show';
    this.onFocus();
  }

  public select(option) {
    this.value             = option.value;
    this.label             = option.label;
    this.optionsVisibility = 'hidden';
    this.labelState        = 'label';
    this.emitChange();
  }

  public isSelected(value) {
    return this.value === value;
  }

  @HostListener('document:click', ['$event'])
  disappear(event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.optionsVisibility = 'hidden';
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
    this.labelState = 'labelOnFocus';
    this.isFocused = true;
    if (this.optionsVisibility === 'hidden') {
      this.optionsVisibility = 'show';
    }
  }

  public onBlur(event?: Event) {
    this.isFocused = false;
    this.optionsVisibility = 'hidden';
    if (this.value === null || this.value === undefined || this.value === '') {
      this.label = '';
      this.labelState = 'placeholder';
      return;
    }
    this.labelState        = 'label';
    this.optionsVisibility = 'hidden';
  }
}
