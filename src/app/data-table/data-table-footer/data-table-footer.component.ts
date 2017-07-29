import {
  Directive,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FrDataTableEvent } from '../data-table/data-table.component';

export interface IFrPaginationInfo {
  totalRows: number;
  page: number;
  rowsPerPageValues: Array<number>;
  rowsPerPage: number;
}

@Directive({
  selector: 'fr-data-table-footer'
})
export class FrDataTableFooterComponent {

  @Output() paginationAction: EventEmitter<FrDataTableEvent> = new EventEmitter<FrDataTableEvent>();

  private _paginationInfo: IFrPaginationInfo;

  @Input()
  set paginationInfo(_paginationInfo) {
    this._paginationInfo = _paginationInfo;
  }

  get paginationInfo(): IFrPaginationInfo {
    return this._paginationInfo;
  }

  /**
   * @deprecated
   * TODO: Remove in v0.7.0
   */
  public invokePaginationAction(event: FrDataTableEvent): void {
    console.warn('@Output() paginationAction of fr-data-table-footer is deprecated. Use @Output() dataTableAction of fr-data-table instead');
    this.paginationAction.emit(event);
  }

}
