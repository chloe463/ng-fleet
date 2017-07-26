import {
  Component,
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

@Component({
  selector: 'fr-data-table-footer',
  templateUrl: './data-table-footer.component.html'
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

  public invokePaginationAction(event: FrDataTableEvent) {
    this.paginationAction.emit(event);
  }

}
