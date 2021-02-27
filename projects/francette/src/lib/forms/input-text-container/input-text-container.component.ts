import {
  AfterContentInit,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2
} from '@angular/core';
import {
  FormControl, NgModel
} from '@angular/forms';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

export const LABEL          = 'label';
export const LABEL_ON_FOCUS = 'labelOnFocus';
export const PLACEHOLDER    = 'placeholder';

@Directive({
  selector: 'input[frInput], textarea[frInput]'
})
export class FrInputDirective implements OnInit, OnDestroy {

  @Input() formControl: FormControl;

  @HostBinding('class.fr-input-text__form') inputTextForm = true;

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
    private _el: ElementRef,
    private _renderer: Renderer2,
    private _ngZone: NgZone
  ) { }

  ngOnInit() {
    let source$: Observable<string>;
    if (this.ngModel) {
      source$ = this.ngModel.valueChanges as Observable<string>;
    } else if (this.formControl) {
      source$ = this.formControl.valueChanges as Observable<string>;
    } else {
      source$ = fromEvent<string>(this._el.nativeElement as any, 'keydown')
        .pipe(pluck('target', 'value'));
    }
    this._subscription = source$.pipe(
      distinctUntilChanged()
    ).subscribe((v: string) => this._updateLabelState(v));

    this.labelState = (this.value) ? LABEL : PLACEHOLDER;
    this.maxLength = this._el.nativeElement.maxLength;

    this._ngZone.runOutsideAngular(() => this.onFocus());
    this._ngZone.runOutsideAngular(() => this.onBlur());
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

  public onFocus() {
    this._renderer.listen(this._el.nativeElement, 'focus', (event) => {
      this._ngZone.run(() => {
        this.focus      = true;
        this.labelState = LABEL_ON_FOCUS;
      });
    });
  }

  public onBlur() {
    this._renderer.listen(this._el.nativeElement, 'blur', () => {
      this._ngZone.run(() => {
        this.focus = false;
        this.labelState = this.value.length === 0 ? PLACEHOLDER : LABEL;
      });
    });
  }

}

@Component({
  selector: 'fr-input-text-container',
  templateUrl: './input-text-container.component.html',
  styleUrls: ['./input-text-container.component.scss']
})
export class FrInputTextContainerComponent implements OnInit, AfterContentInit {

  @HostBinding('class.fr-input-text-container-host') textContainerHost = true;

  @ContentChild(FrInputDirective, { static: true }) input: FrInputDirective;

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
