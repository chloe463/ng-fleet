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

import { FrDataTableColumnsComponent } from '../data-table-columns/data-table-columns.component';
import { FrDataTableHeaderComponent } from '../data-table-header/data-table-header.component';
import { FrDataTableRowsComponent } from '../data-table-rows/data-table-rows.component';
import { FrDataTableFooterComponent } from '../data-table-footer/data-table-footer.component';

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

  @Input() selectable: boolean;

  @ViewChild('dots') dots: ElementRef;

  @ContentChild(FrDataTableHeaderComponent) headerComponent: FrDataTableHeaderComponent;
  @ContentChild(FrDataTableColumnsComponent) columnsComponent: FrDataTableColumnsComponent;
  @ContentChild(FrDataTableRowsComponent) rowsComponent: FrDataTableRowsComponent;
  @ContentChild(FrDataTableFooterComponent) footerComponent: FrDataTableFooterComponent;

  public title: string       = '';
  public columns: Array<any> = [];
  public rows: Array<any>    = [];

  public rowsPerPage: number;
  public paginationInfo;

  public checkedRowIndices: any;
  public checkAllFlag: boolean;

  public actionListState: string = 'hidden';

  constructor() {
  }

  ngAfterContentInit() {
    this.title = this.headerComponent.title;
    this.columnsComponent.columns$.subscribe(newColumns => this.columns = newColumns);
    this.rowsComponent.rows$.subscribe(newRows => this._updateRows(newRows));
    this.paginationInfo = this.footerComponent.paginationInfo;
    this.rowsPerPage    = this.paginationInfo.rowsPerPage;
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

  public updateRowAction(updateAction: string, changeListState = false) {
    const checkedRows = this.rows.filter((row: any, index: number) => {
      return this.checkedRowIndices[index] === true;
    });
    this.headerComponent.invokeUpdateAction({
      action: updateAction, rows: checkedRows
    });
  }

  public otherAction(key: string) {
    const checkedRows = this.rows.filter((row: any, index: number) => {
      return this.checkedRowIndices[index] === true;
    });
    this.headerComponent.invokeOtherAction({
      action: key, rows: checkedRows
    });
    this.actionListState = 'hidden';
  }

  public paginationAction(action: string) {
    this.footerComponent.invokePaginationAction({
      action, rowsPerPage: this.rowsPerPage
    });
  }

  public toggleOtherActionList(): void {
    this.actionListState = (this.actionListState === 'hidden') ? 'show': 'hidden';
  }

  @HostListener('document:click', ['$event'])
  public hideActionListOnClick(event) {
    if (!this.dots.nativeElement.contains(event.target)) {
      this.actionListState = 'hidden';
    }
  }

  @HostListener('window:keydown', ['$event'])
  public hideActionListOnEscape(event) {
    if (event.code === 'Escape' && event.key === 'Escape') {
      this.actionListState = 'hidden';
    }
  }

}
