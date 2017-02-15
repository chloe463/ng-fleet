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
  useExisting: forwardRef(() => FrCalendarComponent),
  multi: true
};

interface IFrDate {
  label: string;
  model: Date | null;
}

@Component({
  selector: 'fr-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: [],
  providers: [CALENDAR_CONTROL_VALUE_ACCESSOR]
})
export class FrCalendarComponent implements OnInit, ControlValueAccessor {

  @Input() name: string;

  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;

  public isFocus: boolean;
  public target: Date;
  public weeks: Array<Array<IFrDate>>;

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
    this.isFocus    = false;
    this.target     = new Date();
    this._resetCalendar(this.target);
  }

  private _resetCalendar(target: Date): void {
    this.weeks  = [];

    const first: Date = new Date(target.getFullYear(), target.getMonth(), 1);
    let week: Array<IFrDate> = [];

    for (let i = 0; i < first.getDay(); ++i) {
      week.push({label: '', model: null});
    }

    for (let i = 1; i <= DATE_MAX; ++i) {
      const d: Date = new Date(target.getFullYear(), target.getMonth(), i);
      if (d.getMonth() !== target.getMonth()) {
        break;
      }
      week.push({label: d.getDate().toString(), model: d});
      if (d.getDay() === SATURDAY) {
        this.weeks.push(week);
        week = [];
      }
    }
    while (week.length < WEEK_DATE_COUNT) {
      week.push({label: '', model: null});
    }
    this.weeks.push(week);
  }

  public move(diff: number): void {
    this.target = new Date(this.target.getFullYear(), this.target.getMonth() + diff, 1);
    this._resetCalendar(this.target);
  }

  public toggleCalendar(): void {
    this.isFocus = !this.isFocus;
  }

  public hideCalendar(): void {
    this.isFocus = false;
  }

  public isSelected(d: Date): boolean {
    if (this._innerValue === undefined || this._innerValue === '' || this._innerValue === null || d === null) {
      return false;
    }
    return this._innerValue.toDateString() === d.toDateString();
  }

  public change(d: Date): void {
    this.value = d;
    this.hideCalendar();
  }
}
