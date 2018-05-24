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
  HostBinding,
  Optional
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import {
  NgModel,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl
} from '@angular/forms';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, pluck, tap } from 'rxjs/operators';

export const LABEL          = 'label';
export const LABEL_ON_FOCUS = 'labelOnFocus';
export const PLACEHOLDER    = 'placeholder';

@Directive({
  selector: 'input[frInput], textarea[frInput]'
})
export class FrInputDirective implements OnInit, OnDestroy {

  @Input() formControl: FormControl;

  @HostBinding('class.fr-input-text__form') true;

  private _subscription: Subscription;

  private _placeholder = '';

  public labelState: string;
  public valueLength = 0;
  public maxLength   = -1;
  public focus = false;

  @HostBinding('placeholder')
  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(s: string) {
    if (s !== this._placeholder) {
      this._placeholder = s;
    }
  }

  get value(): string {
    return this._el.nativeElement.value;
  }

  get disabled() {
    return this._el.nativeElement.disabled;
  }

  constructor(
    @Optional() public ngModel: NgModel,
    private _el: ElementRef
  ) { }

  ngOnInit() {
    let source$: Observable<string>;
    if (this.ngModel) {
      source$ = this.ngModel.valueChanges;
    } else if (this.formControl) {
      source$ = this.formControl.valueChanges;
    } else {
      source$ = fromEvent<string>(this._el.nativeElement as any, 'keydown')
        .pipe(pluck('target', 'value'));
    }
    this._subscription = source$.pipe(
      distinctUntilChanged()
    ).subscribe((v: string) => this._updateLabelState(v));

    this.labelState = (this.value) ? LABEL : PLACEHOLDER;
    this.maxLength = this._el.nativeElement.maxLength;
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private _updateLabelState(v: string) {
    if (this.labelState !== LABEL_ON_FOCUS) {
      this.labelState  = v ? LABEL : PLACEHOLDER;
    }
    this.valueLength = v ? v.length : 0;
  }

  @HostListener('focus')
  public onFocus() {
    this.focus      = true;
    this.labelState = LABEL_ON_FOCUS;
  }

  @HostListener('blur')
  public onBlur() {
    this.focus = false;
    this.labelState = this.value.length === 0 ? PLACEHOLDER : LABEL;
  }

}

@Component({
  selector: 'fr-input-text-container',
  templateUrl: './input-text-container.component.html',
  styleUrls: ['./input-text-container.component.scss']
})
export class FrInputTextContainerComponent implements OnInit, AfterContentInit {

  @HostBinding('class.fr-input-text-container-host') true;

  @ContentChild(FrInputDirective) input: FrInputDirective;

  public maxLength: number;
  public labelState = 'placeholder';
  public placeholder = '';
  public modelLength = 0;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    if (this.input === undefined) {
      throw new Error('Child component input[frInput] is required!');
    }
    if ((this.input instanceof FrInputDirective) === false) {
      throw new Error('Child component input[frInput] is required!');
    }
    this.placeholder = this.input.placeholder;
    this.maxLength   = this.input.maxLength;
  }

}
