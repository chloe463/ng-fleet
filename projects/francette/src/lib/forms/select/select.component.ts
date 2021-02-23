import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  NgZone,
  OnInit,
  Output,
  QueryList,
  Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FrOptionComponent } from './option.component';

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
  styleUrls: ['./select.component.scss'],
  providers: [SELECT_CONTROL_VALUE_ACCESSOR],
  animations: [
    trigger('optionsState', [
      state('visible', style({
        opacity: 1,
        transform: 'scaleY(1)'
      })),
      state('hidden', style({
        opacity: 0,
        transform: 'scaleY(0.86)',
        'pointer-events': 'none',
        'transform-origin': '0 3%'
      })),
      transition('hidden => visible', [
        animate('200ms ease-out')
      ]),
      transition('visible => hidden', [
        animate('200ms 300ms ease-out', style({
          opacity: 0,
          transform: 'scaleY(1)',
        }))
      ]),
    ])
  ]
})
export class FrSelectComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  @Input() name: string;
  @Input() placeholder: string;
  @Input() browserNative: boolean;

  @Output() change: EventEmitter<FrSelectChange> = new EventEmitter<FrSelectChange>();

  @ContentChildren(FrOptionComponent) options: QueryList<FrOptionComponent> = new QueryList<FrOptionComponent>();

  @HostBinding('class.fr-select-host') selectHost = true;

  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;
  private _isDisabled = false;

  public optionsVisibility = HIDDEN;
  public label: string;
  public labelState = PLACEHOLDER;
  public isFocused  = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.optionsVisibility = HIDDEN;

    this.ngZone.runOutsideAngular(() => this.disappear());
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

  public onChange(value: any): void {
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

  public select(option: any, event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.value             = option.value;
    this.label             = option.label;
    this.optionsVisibility = HIDDEN;
    this.labelState        = LABEL;
    this.emitChange();
    this._onTouchedCallback();
  }

  public isSelected(value: any) {
    return this.value === value;
  }

  disappear() {
    this.renderer.listen('document', 'click', (event: MouseEvent) => {
      if (!this.el.nativeElement.contains(event.target) && this.optionsVisibility !== HIDDEN) {
        this.ngZone.run(() => {
          this.onBlur();
        });
      }
    });
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
    this._onTouchedCallback();
    if (this.value === null || this.value === undefined || this.value === '') {
      this.label = '';
      this.labelState = PLACEHOLDER;
      return;
    }
    this.labelState        = LABEL;
  }
}
