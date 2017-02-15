import { Component, OnInit, Input } from '@angular/core';

export interface IKpiRow {
  name: string;
  values: Array<string | number>;
}

export interface IKpiData {
  dateList: Array<Date>;
  kpi: Array<IKpiRow>;
}

@Component({
  selector: 'fr-kpi-table',
  templateUrl: './kpi-table.component.html',
  styleUrls: []
})
export class FrKpiTableComponent implements OnInit {
  @Input() data: IKpiData;

  constructor() {
  }

  ngOnInit() {
  }

  public isSunday(date: number): boolean {
    const d = this.int2DateObj(date);
    return d.getDay() === 0;
  }

  public isSaturday(date: number): boolean {
    const d = this.int2DateObj(date);
    return d.getDay() === 6;
  }

  private int2DateObj(objectDate: number): Date {
    if (!objectDate.toString().match(/[0-9]{8}/)) {
      throw 'objectDate MUST be [0-9]{8}';
    }
    let year  = objectDate.toString().substr(0, 4),
      month = objectDate.toString().substr(4, 2),
      date  = objectDate.toString().substr(6, 2);
    return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(date, 10));
  }

  public objectDate2MonthDate(objectDate: number): string {
    if (!objectDate.toString().match(/[0-9]{8}/)) {
      throw 'objectDate MUST be [0-9]{8}';
    }
    let month = objectDate.toString().substr(4, 2),
      date  = objectDate.toString().substr(6, 2);
    return month + '/' + date;
  }
}
