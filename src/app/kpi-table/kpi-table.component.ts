import { Component, OnInit, Input } from '@angular/core';

export interface IKpiRow {
  name: string;
  values: Array<string | number>;
}

export interface IKpiData {
  dateList: Array<number>;
  kpi: Array<IKpiRow>;
}

const SUNDAY   = 0;
const SATURDAY = 6;

@Component({
  selector: 'fr-kpi-table',
  templateUrl: './kpi-table.component.html'
})
export class FrKpiTableComponent implements OnInit {
  @Input() data: IKpiData;

  constructor() {
  }

  ngOnInit() {
  }

  public isSunday(date: number): boolean {
    const d = this.int2DateObj(date);
    return d.getDay() === SUNDAY;
  }

  public isSaturday(date: number): boolean {
    const d = this.int2DateObj(date);
    return d.getDay() === SATURDAY;
  }

  private int2DateObj(objectDate: number): Date {
    if (!objectDate.toString().match(/^[0-9]{8}$/)) {
      throw new Error('objectDate MUST be ^[0-9]{8}$');
    }
    const year  = parseInt(objectDate.toString().substr(0, 4), 10);
    const month = parseInt(objectDate.toString().substr(4, 2), 10);
    const date  = parseInt(objectDate.toString().substr(6, 2), 10);
    return new Date(year, month - 1, date);
  }

  public objectDate2MonthDate(objectDate: number): string {
    if (!objectDate.toString().match(/[0-9]{8}/)) {
      throw new Error('objectDate MUST be ^[0-9]{8}$');
    }
    const month = objectDate.toString().substr(4, 2);
    const date  = objectDate.toString().substr(6, 2);
    return month + '/' + date;
  }
}
