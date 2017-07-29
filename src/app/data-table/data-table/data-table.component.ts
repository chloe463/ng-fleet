import {
  Component,
  OnInit,
  AfterContentInit,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  ContentChildren,
  ViewChild,
  QueryList,
  HostListener,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

import { FrDataTableColumnsComponent, IFrDataTableColumn } from '../data-table-columns/data-table-columns.component';
import { FrDataTableHeaderComponent } from '../data-table-header/data-table-header.component';
import { FrDataTableRowsComponent } from '../data-table-rows/data-table-rows.component';
import { FrDataTableFooterComponent } from '../data-table-footer/data-table-footer.component';

export class FrDataTableEvent {
  constructor(
    public action: string,
    public row: Array<any>,
    public rowsPerPage: number,
    public page: number,
    public extraParam?: any
  ) {}
}


@Component({
  selector: 'fr-data-table',
  templateUrl: './data-table.component.html',
  animations: [
    trigger('actionListState', [
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0)'
      })),
      state('show', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('* => *', [
        animate('500ms cubic-bezier(0.35, 0.25, 0, 1)')
      ])
    ])
  ]
})
export class FrDataTableComponent implements AfterContentInit {

  @Input() selectable: boolean = false;
  @Input() sortable: boolean = false;

  @Output() dataTableAction: EventEmitter<FrDataTableEvent> = new EventEmitter<FrDataTableEvent>();

  @ViewChild('dots') dots: ElementRef;

  @ContentChild(FrDataTableHeaderComponent) headerComponent: FrDataTableHeaderComponent;
  @ContentChild(FrDataTableColumnsComponent) columnsComponent: FrDataTableColumnsComponent;
  @ContentChild(FrDataTableRowsComponent) rowsComponent: FrDataTableRowsComponent;
  @ContentChild(FrDataTableFooterComponent) footerComponent: FrDataTableFooterComponent;

  public title: string       = '';
  public columns: Array<any> = [];
  public rows: Array<any>    = [];
  public sortState = { column: null, order: 'asc' };

  public rowsPerPage: number;
  public paginationInfo;

  public checkedRowIndices: any;
  public checkAllFlag: boolean;

  public actionListState: string = 'hidden';

  ngAfterContentInit() {
    this.title = this.headerComponent.title;
    if (this.columnsComponent) {
      this.columnsComponent.columns$.subscribe(newColumns => this.columns = newColumns);
    }
    if (this.rowsComponent) {
      this.rowsComponent.rows$.subscribe(newRows => this._updateRows(newRows));
    }
    if (this.footerComponent) {
      this.paginationInfo = this.footerComponent.paginationInfo;
      this.rowsPerPage    = this.paginationInfo.rowsPerPage;
    }
  }

  private _updateRows(newRows: Array<any>): void {
    this.rows = newRows;
    this.checkedRowIndices = {};
    newRows.forEach((row, index) => {
      this.checkedRowIndices[index] = false;
    });
  }

  public checkAll(): void {
    Object.keys(this.checkedRowIndices).forEach((index) => {
      this.checkedRowIndices[index] = this.checkAllFlag;
    });
  }

  public countCheckedRows(): number {
    let count = 0;
    this.rows.forEach((row, index) => {
      if (this.checkedRowIndices[index]) {
        ++count;
      }
    });
    return count;
  }

  private _extraceCheckedRows(): Array<any> {
    return this.rows.filter((row: any, index: number) => {
      return this.checkedRowIndices[index] === true;
    });
  }

  public emitSortAction(targetColumn: any): void {
    if (!this.sortable) {
      return;
    }
    if (this.sortState.column === targetColumn) {
      this.sortState.order = (this.sortState.order === 'asc') ? 'desc' : 'asc';
    } else {
      this.sortState.order = 'asc';
    }
    this.sortState.column = targetColumn;
    const event = new FrDataTableEvent(
      'sort',
      this._extraceCheckedRows(),
      this.rowsPerPage,
      this.paginationInfo.page,
      {
        sortParams: { targetColumn, order: this.sortState.order }
      }
    );
    this.dataTableAction.emit(event);
  }

  public updateRowAction(updateAction: string, changeListState = false): void {
    const checkedRows = this._extraceCheckedRows();
    const event = new FrDataTableEvent(updateAction, checkedRows, this.rowsPerPage, this.paginationInfo.page);
    // TODO: Delete headerComponent.invokeUpdateAction in v0.7.0
    if (this.dataTableAction) {
      this.dataTableAction.emit(event);
    } else {
      this.headerComponent.invokeUpdateAction(event);
    }
  }

  public otherAction(key: string): void {
    const checkedRows = this._extraceCheckedRows();
    const event = new FrDataTableEvent(key, checkedRows, this.rowsPerPage, this.paginationInfo.page);
    this.actionListState = 'hidden';
    if (this.dataTableAction) {
      this.dataTableAction.emit(event);
    } else {
      // TODO: Delete headerComponent.invokeUpdateAction in v0.7.0
      this.headerComponent.invokeUpdateAction(event);
    }
  }

  public paginationAction(action: string): void {
    const checkedRows = this._extraceCheckedRows();
    const event = new FrDataTableEvent(action, checkedRows, this.rowsPerPage, this.paginationInfo.page);
    if (this.dataTableAction) {
      this.dataTableAction.emit(event);
    } else {
      // TODO: Delete footerComponent.invokePaginationAction in v0.7.0
      this.footerComponent.invokePaginationAction(event);
    }
  }

  public toggleOtherActionList(): void {
    this.actionListState = (this.actionListState === 'hidden') ? 'show': 'hidden';
  }

  @HostListener('document:click', ['$event'])
  public hideActionListOnClick(event): void {
    if (!this.dots.nativeElement.contains(event.target)) {
      this.actionListState = 'hidden';
    }
  }

  @HostListener('window:keydown', ['$event'])
  public hideActionListOnEscape(event): void {
    if (event.code === 'Escape' && event.key === 'Escape') {
      this.actionListState = 'hidden';
    }
  }

}
