import {
  Component,
  Input,
  OnInit,
  QueryList,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {};

const SUNDAY   = 0;
const SATURDAY = 6;
const DATE_MAX = 31;
const WEEK_DATE_COUNT = 7;

export const CALENDAR_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarComponent),
  multi: true
};

@Component({
  selector: 'fr-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: [],
  providers: [CALENDAR_CONTROL_VALUE_ACCESSOR]
})
export class CalendarComponent implements OnInit, ControlValueAccessor {

  @Input() name;

  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;

  private _isFocus: boolean;
  private _target: Date;
  private _weeks: Array<any>;

  constructor() {
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
    this._isFocus    = false;
    this._target     = new Date();
    this._resetCalendar(this._target);
  }

  private _resetCalendar(target: Date): void {
    this._weeks  = [];

    const first = new Date(target.getFullYear(), target.getMonth(), 1);
    let week    = [];

    for (let i = 0; i < first.getDay(); ++i) {
      week.push({label: '', model: null});
    }

    for (let i = 1; i <= DATE_MAX; ++i) {
      const d = new Date(target.getFullYear(), target.getMonth(), i);
      if (d.getMonth() !== target.getMonth()) {
        break;
      }
      week.push({label: d.getDate(), model: d});
      if (d.getDay() === SATURDAY) {
        this._weeks.push(week);
        week = [];
      }
    }
    while (week.length < WEEK_DATE_COUNT) {
      week.push({label: '', model: null});
    }
    this._weeks.push(week);
  }

  private _move(diff: number): void {
    this._target = new Date(this._target.getFullYear(), this._target.getMonth() + diff, 1);
    this._resetCalendar(this._target);
  }

  private _toggleCalendar(): void {
    this._isFocus = !this._isFocus;
  }

  private _hideCalendar(): void {
    this._isFocus = false;
  }

  private _isSelected(d: Date): boolean {
    if (this._innerValue === undefined || this._innerValue === '' || this._innerValue === null || d === null) return false;
    return this._innerValue.toDateString() == d.toDateString();
  }

  private _change(d: Date): void {
    this.value = d;
    this._hideCalendar();
  }
}
