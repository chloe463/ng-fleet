import {
  Component,
  Input,
  OnInit,
  QueryList,
  forwardRef,
  HostListener,
  ElementRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {};

const SUNDAY   = 0;
const SATURDAY = 6;
const DATE_MAX = 31;
const WEEK_DATE_COUNT = 7;

export const DATE_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FrDatePickerComponent),
  multi: true
};

@Component({
  selector: 'fr-date-picker',
  templateUrl: './date-picker.component.html',
  providers: [DATE_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class FrDatePickerComponent implements OnInit, ControlValueAccessor {

  @Input() name: string;

  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;

  public calendarVisibility: boolean;
  public target: Date;
  public weeks: Array<Array<Date | null>>;
  private _oldValue: Date;
  private _selectOutOfMonth: boolean;

  constructor(private el: ElementRef) {
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
    this.calendarVisibility = false;
    this.target             = new Date();
    this._resetCalendar(this.target);
  }

  private _resetCalendar(target: Date): void {
    this.weeks  = [];

    const first: Date = new Date(target.getFullYear(), target.getMonth(), 1);
    let week: Array<Date> = [];

    // A month before target month
    for (let i = -(first.getDay() - 1); i <= 0; ++i) {
      const d: Date = new Date(target.getFullYear(), target.getMonth(), i);
      week.push(d);
    }

    // target month
    for (let i = 1; i <= DATE_MAX; ++i) {
      const d: Date = new Date(target.getFullYear(), target.getMonth(), i);
      if (d.getMonth() !== target.getMonth()) {
        break;
      }
      week.push(d);
      if (d.getDay() === SATURDAY) {
        this.weeks.push(week);
        week = [];
      }
    }

    // Next month
    for (let i = 1; week.length < WEEK_DATE_COUNT; ++i) {
      week.push(new Date(target.getFullYear(), target.getMonth() + 1, i));
    }
    this.weeks.push(week);
  }

  public move(diff: number): void {
    this.target = new Date(this.target.getFullYear(), this.target.getMonth() + diff, 1);
    this._resetCalendar(this.target);
  }

  public toggleCalendarVisibility(): void {
    this._oldValue = new Date(this._innerValue.getTime());
    this.calendarVisibility = !this.calendarVisibility;
  }

  public isToday(d: Date): boolean {
    if (d === null) {
      return false;
    }
    const today = new Date();
    return (d.getFullYear() === today.getFullYear()
            && d.getMonth() === today.getMonth()
            && d.getDate() === today.getDate());
  }

  private toObjectDate(d: Date): string {
    return '';
  }

  public isSelected(d: Date): boolean {
    if (this._innerValue === undefined || this._innerValue === '' || this._innerValue === null || d === null) {
      return false;
    }
    return this._innerValue.toDateString() === d.toDateString();
  }

  public changeDate(d: Date): void {
    if (d === null) {
      return;
    }
    this.value = d;
    if (d.getMonth() !== this.target.getMonth()) {
      this.target = d;
      this._resetCalendar(d);
      this._selectOutOfMonth = true;
    }
  }

  public isOutOfMonth(d: Date): boolean {
    return (d.getFullYear() !== this.target.getFullYear()
            || d.getMonth() !== this.target.getMonth());
  }

  public cancel(): void {
    this.value = this._oldValue;
    this.calendarVisibility = false;
  }

  public commit(): void {
    this.calendarVisibility = false;
  }

  @HostListener('document:click', ['$event'])
  public disapperOnClick(event) {
    // Without this condition, calendar disappear
    // when select previous or next month date.
    if (this._selectOutOfMonth) {
      this._selectOutOfMonth = false;
      return;
    }

    if (!this.el.nativeElement.contains(event.target)) {
      this.calendarVisibility = false;
    }
  }

  @HostListener('window:keydown', ['$event'])
  public disapperOnKeyDown(event) {
    if (event.key === 'Escape') {
      this.calendarVisibility = false;
    }
  }

}