import {
  Component,
  OnInit,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'fr-data-table-rows',
  templateUrl: './data-table-rows.component.html',
  styleUrls: ['./data-table-rows.component.scss']
})
export class FrDataTableRowsComponent implements OnInit {

  private _rows;

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

}
