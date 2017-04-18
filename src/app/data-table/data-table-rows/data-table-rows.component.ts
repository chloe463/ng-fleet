import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'fr-data-table-rows',
  templateUrl: './data-table-rows.component.html'
})
export class FrDataTableRowsComponent implements OnInit, OnChanges {

  private _rows;

  private _listener: () => void = () => {};

  @Input()
  set rows(rows: Array<any>) {
    this._rows = rows;
  }

  get rows(): Array<any> {
    return this._rows;
  }

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges () {
    this._listener();
  }

  public subscribe(fn: () => void): void {
    this._listener = fn;
  }
}
