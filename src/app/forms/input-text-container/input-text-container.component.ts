import {
  Component,
  Directive,
  OnInit,
  AfterContentInit,
  AfterViewInit,
  AfterContentChecked,
  AfterViewChecked,
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
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Directive({
  selector: 'input[frInput], textarea[frInput]',
  host: {
    '[class.fr-input-text__form]': 'true',
    '[placeholder]': 'placeholder',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()'
  }
})
export class FrInputDirective implements OnInit {

  private _placeholder: string = '';

  public labelState: string;

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
    this.ngModel.valueChanges.subscribe((v) => {
      this.labelState = v ? 'label' : 'placeholder';
    });
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
  },
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
      transition('placeholder => labelOnFocus, labelOnFocus => placeholder, labelOnFocus => label, label => labelOnFocus, placeholder => label', [
        animate('200ms ease-out')
      ])
    ])
  ]
})
export class FrInputTextContainerComponent implements OnInit, AfterContentInit, AfterViewChecked {

  @ContentChild(FrInputDirective) _input: FrInputDirective;

  public labelState = 'placeholder';
  public placeholder: string = '';

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

  ngAfterViewChecked () {
    // console.log(this);
  }

}
