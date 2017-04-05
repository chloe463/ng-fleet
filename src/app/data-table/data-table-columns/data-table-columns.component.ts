import {
  Component,
  OnInit,
  Input
} from '@angular/core';

export interface IFrDataTableColumn {
  name: string;
  type: string;
}

@Component({
  selector: 'fr-data-table-columns',
  templateUrl: './data-table-columns.component.html'
})
export class FrDataTableColumnsComponent implements OnInit {

  private _columns;

  @Input()
  set columns(columns: Array<IFrDataTableColumn>) {
    this._columns = columns;
  }

  get columns(): Array<IFrDataTableColumn> {
    return this._columns;
  }

  constructor() { }

  ngOnInit() {
  }

}
