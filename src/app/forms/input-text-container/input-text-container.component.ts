import {
  Component,
  Directive,
  OnInit,
  OnDestroy,
  AfterContentInit,
  AfterContentChecked,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  forwardRef,
  ElementRef,
  HostListener,
  Optional
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { NgModel, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const LABEL          = 'label';
export const LABEL_ON_FOCUS = 'labelOnFocus';
export const PLACEHOLDER    = 'placeholder';

@Directive({
  selector: 'input[frInput], textarea[frInput]',
  host: {
    '[class.fr-input-text__form]': 'true',
    '[placeholder]': 'placeholder',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()'
  }
})
export class FrInputDirective implements OnInit, OnDestroy {

  private _ngModelSubscribtion;

  private _placeholder: string = '';

  public labelState: string;
  public valueLength: number = 0;
  public maxLength: number = -1;

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(s: string) {
    if (s != this._placeholder) {
      this._placeholder = s;
    }
  }

  constructor(
    @Optional() public ngModel: NgModel,
    private _el: ElementRef
  ) { }

  ngOnInit() {
    if (this.ngModel) {
      this.labelState = (this.ngModel.model) ? LABEL : PLACEHOLDER;
      this._ngModelSubscribtion = this.ngModel.valueChanges.subscribe((v) => {
        this._updateLabelState(v);
      });
    } else {
      this.labelState = (this._el.nativeElement.value) ? LABEL : PLACEHOLDER;
    }
    this.maxLength = this._el.nativeElement.maxLength;
  }

  ngOnDestroy() {
    this._ngModelSubscribtion.unsubscribe();
  }

  private _updateLabelState(v: any) {
    if (this.labelState === LABEL_ON_FOCUS) {
      this.labelState  = v ? LABEL_ON_FOCUS : PLACEHOLDER;
    } else {
      this.labelState  = v ? LABEL : PLACEHOLDER;
    }
    this.valueLength = v ? v.length : 0;
  }

  public onFocus() {
    this.labelState = LABEL_ON_FOCUS;
  }

  public onBlur() {
    if (this.ngModel) {
      if (!this.ngModel.viewModel) {
        this.labelState = PLACEHOLDER;
        return;
      }
    } else {
      if (!this._el.nativeElement.value) {
        this.labelState = PLACEHOLDER;
        return;
      }
    }
    this.labelState = LABEL;
  }

}

@Component({
  selector: 'fr-input-text-container',
  templateUrl: './input-text-container.component.html'
})
export class FrInputTextContainerComponent implements OnInit, AfterContentInit {

  @ContentChild(FrInputDirective) _input: FrInputDirective;

  public maxLength: number;
  public labelState = 'placeholder';
  public placeholder: string = '';
  public modelLength: number = 0;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    if (this._input === undefined) {
      throw "Child component input[frInput] is required!";
    }
    if ((this._input instanceof FrInputDirective) === false) {
      throw "Child component input[frInput] is required!";
    }
    this.placeholder = this._input.placeholder;
    this.maxLength   = this._input.maxLength;
  }

}
