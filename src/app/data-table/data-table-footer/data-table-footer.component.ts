import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

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
export class FrDataTableFooterComponent implements OnInit {

  @Output() paginationAction = new EventEmitter();

  private _paginationInfo: IFrPaginationInfo;

  @Input()
  set paginationInfo(_paginationInfo) {
    this._paginationInfo = _paginationInfo;
  }

  get paginationInfo(): IFrPaginationInfo {
    return this._paginationInfo;
  }

  constructor() { }

  ngOnInit() {
  }

  public invokePaginationAction(event) {
    this.paginationAction.emit(event);
  }

}
