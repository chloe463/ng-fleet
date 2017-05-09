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
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { NgModel, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(s: string) {
    if (s != this._placeholder) {
      this._placeholder = s;
    }
  }

  constructor(public ngModel: NgModel) {
  }

  ngOnInit() {
    this.labelState = (this.ngModel.model) ? 'label' : 'placeholder';
    this._ngModelSubscribtion = this.ngModel.valueChanges.subscribe((v) => {
      this._updateLabelState(v);
    });
  }

  ngOnDestroy() {
    this._ngModelSubscribtion.unsubscribe();
  }

  private _updateLabelState(v: any) {
    if (this.labelState === 'labelOnFocus') {
      this.labelState  = v ? 'labelOnFocus' : 'placeholder';
    } else {
      this.labelState  = v ? 'label' : 'placeholder';
    }
    this.valueLength = v ? v.length : 0;
  }

  public onFocus() {
    this.labelState = 'labelOnFocus';
  }

  public onBlur() {
    if (!this.ngModel.model) {
      this.labelState = 'placeholder';
      return;
    }
    this.labelState = 'label';
  }

}

@Component({
  selector: 'fr-input-text-container',
  templateUrl: './input-text-container.component.html',
  host: {
    '[class.fr-input-text__label--focused]': '_input.focus'
  }
})
export class FrInputTextContainerComponent implements OnInit, AfterContentInit {

  @ContentChild(FrInputDirective) _input: FrInputDirective;

  @Input() maxLength: number;

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
  }

}
