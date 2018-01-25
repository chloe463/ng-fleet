import { Component, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Component({
  selector: 'fr-data-table-rows',
  template: ''
})
export class FrDataTableRowsComponent {

  private _rows: Array<any> = [];
  private _rows$: ReplaySubject<Array<any>> = new ReplaySubject<Array<any>>(1);

  @Input()
  set rows(rows: Array<any>) {
    this._rows = rows;
    this._rows$.next(rows);
  }

  get rows(): Array<any> {
    return this._rows;
  }

  get rows$(): ReplaySubject<Array<any>> {
    return this._rows$;
  }

}
