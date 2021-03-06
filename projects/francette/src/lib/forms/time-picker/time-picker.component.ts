import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  NgZone,
  OnInit,
  Output,
  Provider,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export class FrTimePickerChange {
  source: FrTimePickerComponent;
  value: Date;
}

const noop = () => {};

const HOURS   = 'hours';
const MINUTES = 'minutes';

type DialKey = typeof HOURS | typeof MINUTES;

const DIALS: { [key in DialKey]: number[] } = {
  hours: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
};

const HIDDEN = 'hidden';
const SHOW   = 'show';

export const TIME_PICKER_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FrTimePickerComponent),
  multi: true
};

@Component({
  selector: 'fr-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  providers: [TIME_PICKER_CONTROL_VALUE_ACCESSOR],
  animations: [
    trigger('clockVisibility', [
      state(HIDDEN, style({
        opacity: 0,
        transform: 'translateY(-5%)',
        'pointer-events': 'none'
      })),
      state(SHOW, style({
        opacity: 1
      })),
      transition(`${HIDDEN} => ${SHOW}`, [
        animate('200ms ease-out')
      ]),
      transition(`${SHOW} => ${HIDDEN}`, [
        animate('200ms 200ms ease-out')
      ])
    ])
  ]
})
export class FrTimePickerComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input() name: string;

  @Output() change: EventEmitter<FrTimePickerChange> = new EventEmitter<FrTimePickerChange>();

  @ViewChild('clock', { static: true }) clock: ElementRef;
  @ViewChild('clockHand', { static: true }) clockHand: ElementRef;

  @HostBinding('class.fr-timepicker-host') timepickerHost = true;

  /**
   * For ControlValueAccessor
   */
  private _innerValue: Date = new Date();
  private _onChangeCallback: (_: Date) => void = noop;
  private _onTouchedCallback: () => void = noop;
  private _isDisabled = false;

  public clockVisibility: string;
  public pickTarget: DialKey = HOURS;
  public dials: Array<number> = [];
  public changing = false;
  private _oldValue: Date;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) { }

  get value(): Date {
    return this._innerValue;
  }

  set value(obj: Date) {
    if (obj !== this._innerValue && obj !== null && obj !== undefined) {
      this._innerValue = obj;
      this._onChangeCallback(obj);
    }
  }

  writeValue(obj: Date): void {
    if (obj !== this._innerValue && obj !== null && obj !== undefined) {
      this._innerValue = obj;
    }
  }

  registerOnChange(fn: (v: Date) => void): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.clockVisibility = HIDDEN;
    this._isDisabled = isDisabled;
  }

  get disabled() {
    return this._isDisabled;
  }

  set disabled(isDisabled) {
    this._isDisabled = isDisabled;
  }

  ngOnInit() {
    this._innerValue     = new Date();
    this.pickTarget      = HOURS;
    this.clockVisibility = HIDDEN;
    this.setDials();

    this.ngZone.runOutsideAngular(() => this.disapperOnClick());
    this.ngZone.runOutsideAngular(() => this.disapperOnKeyDown());
  }

  ngAfterViewInit() {
    this.putDialsRightPosition();
    this.putHandRightPosition(this._innerValue.getHours());
  }

  private emitChange(): void {
    const event  = new FrTimePickerChange();
    event.source = this;
    event.value  = this.value;
    this.change.emit(event);
  }

  public setDials(type: DialKey = HOURS): void {
    this.dials = DIALS[type];
  }

  public putDialsRightPosition(): void {
    const dials  = this.clock.nativeElement.getElementsByClassName('fr-timepicker__clock-dial');
    const radian = (30 * Math.PI / 180.0);
    const radius = 125;

    for (let i = 0; i < dials.length; ++i) {
      const dial = dials[i];
      const x    = Math.cos(radian * (i - 3)) * radius + radius;
      const y    = Math.sin(radian * (i - 3)) * radius + radius;
      dial.style.top  = y + 'px';
      dial.style.left = x + 'px';
    }
  }

  public putHandRightPosition(dial: number): void {
    let deg = 0;
    if (this.pickTarget === HOURS) {
      deg = (dial % 12) * 30;
    } else {
      deg = ((dial / 5) % 12) * 30;
    }
    this.clockHand.nativeElement.style.transform = `rotate(${deg}deg)`;
  }

  public toggleTimePickerVisibility(): void {
    if (this.disabled) {
      return;
    }
    this._oldValue = new Date(this._innerValue.getTime());
    this.clockVisibility = (this.clockVisibility === HIDDEN) ? SHOW : HIDDEN;
  }

  public isAm(): boolean {
    if (this._innerValue === undefined || this._innerValue === null) {
      return false;
    }
    return this._innerValue.getHours() < 12;
  }

  public toggleAmPm(): void {
    const newDateObj = new Date(this._innerValue.getTime());
    newDateObj.setHours((this._innerValue.getHours() + 12) % 24);
    this.value = newDateObj;
    this.emitChange();
  }

  public setHours(h: number): void {
    if (!this.isAm()) {
      h = (h + 12) % 24;
    }
    const newDateObj = new Date(this._innerValue.getTime());
    newDateObj.setHours(h);
    this.value = newDateObj;
  }

  public setMinute(m: number): void {
    const newDateObj = new Date(this._innerValue.getTime());
    newDateObj.setMinutes(m);
    this.value = newDateObj;
  }

  public setTime(dial: number): void {
    if (this.pickTarget === HOURS) {
      this.setHours(dial);
    } else if (this.pickTarget === MINUTES) {
      this.setMinute(dial);
    }
    this.putHandRightPosition(dial);
    this.emitChange();
  }

  public isPickedTime(dial: number): boolean {
    if (!this._innerValue) {
      return false;
    }
    if (this.pickTarget === HOURS) {
      return (this._innerValue.getHours() % 12) === (dial % 12);
    } else if (this.pickTarget === MINUTES) {
      return this._innerValue.getMinutes() === dial;
    }
    throw new Error(`Invalid dial type: ${this.pickTarget}`);
  }

  public togglePickTarget(pickTarget: DialKey = HOURS): void {
    if (this.pickTarget === pickTarget) {
      return;
    }
    this.changing   = true;
    this.pickTarget = pickTarget;
    this.setDials(this.pickTarget);

    // wait for dials rendering
    setTimeout(() => {
      this.putDialsRightPosition();
      const targetDial = (pickTarget === HOURS)
        ? this.value.getHours()
        : this.value.getMinutes() - (this.value.getMinutes() % 5);
      this.putHandRightPosition(targetDial);
      this.changing = false;
    }, 50);
  }

  public cancel(): void {
    this.value = this._oldValue;
    this.toggleTimePickerVisibility();
    this._onTouchedCallback();
  }

  public commit(): void {
    this.value = this._innerValue;
    this.toggleTimePickerVisibility();
    this._onTouchedCallback();
  }

  public disapperOnClick() {
    this.renderer.listen('document', 'click', (event: MouseEvent) => {
      if (!this.el.nativeElement.contains(event.target) && this.clockVisibility !== HIDDEN) {
        this.ngZone.run(() => {
          this.clockVisibility = HIDDEN;
          this._onTouchedCallback();
        });
      }
    });
  }

  public disapperOnKeyDown() {
    this.renderer.listen('window', 'keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.clockVisibility !== HIDDEN) {
        this.ngZone.run(() => {
          this.clockVisibility = HIDDEN;
          this._onTouchedCallback();
        });
      }
    });
  }
}
