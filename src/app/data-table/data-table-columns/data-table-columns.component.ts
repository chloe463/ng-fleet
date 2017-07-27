import { Directive, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export interface IFrDataTableColumn {
  key: string;
  name: string;
  type: string;
}

@Directive({
  selector: 'fr-data-table-columns'
})
export class FrDataTableColumnsComponent {

  private _columns: Array<IFrDataTableColumn> = [];
  private _columns$: ReplaySubject<Array<IFrDataTableColumn>> = new ReplaySubject<Array<IFrDataTableColumn>>(1);

  @Input()
  set columns(columns: Array<IFrDataTableColumn>) {
    this._columns = columns;
    this._columns$.next(columns);
  }

  get columns(): Array<IFrDataTableColumn> {
    return this._columns;
  }

  get columns$(): ReplaySubject<Array<any>> {
    return this._columns$;
  }

}
