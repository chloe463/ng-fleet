import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  forwardRef,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {};

const DIALS = {
  hours: [12,1,2,3,4,5,6,7,8,9,10,11],
  minutes: [0,5,10,15,20,25,30,35,40,45,50,55]
}
const HOURS   = 'hours';
const MINUTES = 'minutes';

export const TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FrTimePickerComponent),
  multi: true
};

@Component({
  selector: 'fr-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: [],
  providers: [TIME_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class FrTimePickerComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input() name: string;

  @ViewChild('clock') clock: ElementRef;

  /**
   * For ControlValueAccessor
   */
  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;

  public clockVisibility: boolean;
  public pickTarget: string = HOURS;
  public dials: Array<number> = [];
  public changing: boolean = false;
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

  setDisableState(isDisabled: boolean): void {
  }

  ngOnInit() {
    this._innerValue     = new Date();
    this.pickTarget      = HOURS;
    this.clockVisibility = false;
    this.setDials();
  }

  ngAfterViewInit() {
    this.putDialsRightPosition();
  }

  public setDials(type: string = HOURS): void {
    this.dials = DIALS[type];
  }

  public putDialsRightPosition(): void {
    const dials  = this.clock.nativeElement.children;
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

  public toggleTimePickerVisibility(): void {
    this._oldValue = new Date(this._innerValue.getTime());
    this.clockVisibility = !this.clockVisibility;
  }

  public isAm(): boolean {
    return this._innerValue.getHours() < 12;
  }

  public isPm(): boolean {
    return this._innerValue.getHours() >= 12;
  }

  public toggleAmPm(): void {
    const newDateObj = new Date(this._innerValue.getTime());
    newDateObj.setHours((this._innerValue.getHours() + 12) % 24);
    this.value = newDateObj;
  }

  public setHours(h: number): void {
    if (this.isPm()) {
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
  }

  public isPickedTime(dial: number): boolean {
    if (this.pickTarget === HOURS) {
      return (this._innerValue.getHours() % 12) === (dial % 12);
    } else if (this.pickTarget === MINUTES) {
      return this._innerValue.getMinutes() === dial;
    }
  }

  public togglePickTarget(): void {
    this.changing   = true;
    this.pickTarget = this.pickTarget === HOURS ? MINUTES : HOURS;
    this.setDials(this.pickTarget);
    // wait for dials rendering
    setTimeout(() => {
      this.putDialsRightPosition();
      this.changing = false;
    }, 50);
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
  public disapper(event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.clockVisibility = false;
    }
  }
}
