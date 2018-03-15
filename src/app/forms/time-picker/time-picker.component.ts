import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ElementRef,
  HostBinding,
  HostListener,
  ViewChild
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { timer } from 'rxjs/observable/timer';

export class FrTimePickerChange {
  source: FrTimePickerComponent;
  value: any;
}

const noop = () => {};

const DIALS = {
  hours: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
};
const HOURS   = 'hours';
const MINUTES = 'minutes';

const HIDDEN = 'hidden';
const SHOW   = 'show';

export const TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
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

  @ViewChild('clock') clock: ElementRef;
  @ViewChild('clockHand') clockHand: ElementRef;

  @HostBinding('class.fr-timepicker-host') true;

  /**
   * For ControlValueAccessor
   */
  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;
  private _isDisabled = false;

  public clockVisibility: string;
  public pickTarget: string = HOURS;
  public dials: Array<number> = [];
  public changing = false;
  private _oldValue: Date;

  constructor(private el: ElementRef) { }

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

  public setDials(type: string = HOURS): void {
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
  }

  public togglePickTarget(pickTarget = HOURS): void {
    if (this.pickTarget === pickTarget) {
      return;
    }
    this.changing   = true;
    this.pickTarget = pickTarget;
    this.setDials(this.pickTarget);

    // wait for dials rendering
    timer(50).subscribe(() => {
      this.putDialsRightPosition();
      const targetDial = (pickTarget === HOURS)
        ? this.value.getHours()
        : this.value.getMinutes() - (this.value.getMinutes() % 5);
      this.putHandRightPosition(targetDial);
      this.changing = false;
    });
  }

  public cancel(): void {
    this.value = this._oldValue;
    this.toggleTimePickerVisibility();
  }

  public commit(): void {
    this.value = this._innerValue;
    this.toggleTimePickerVisibility();
  }

  @HostListener('document:click', ['$event'])
  public disapperOnClick(event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.clockVisibility = HIDDEN;
    }
  }

  @HostListener('window:keydown', ['$event'])
  public disapperOnKeyDown(event) {
    if (event.key === 'Escape') {
      this.clockVisibility = HIDDEN;
    }
  }
}
