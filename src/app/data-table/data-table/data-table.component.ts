import {
  Component,
  OnInit,
  AfterContentInit,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  ContentChildren,
  QueryList,
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
        transform: 'scaleY(0)'
      })),
      state('show', style({
        opacity: 1,
        transform: 'scaleY(1)'
      })),
      transition('* => *', [
        animate('500ms cubic-bezier(0.35, 0.25, 0, 1)')
      ])
    ])
  ]
})
export class FrDataTableComponent implements OnInit, AfterContentInit {

  @Input() selectable: boolean;

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

  ngOnInit() {
    this.checkedRowIndices = {};
  }

  ngAfterContentInit() {
    this.title   = this.headerComponent.title;
    this.columns = this.columnsComponent.columns;
    this.rows    = this.rowsComponent.rows;
    this.rows.forEach((row, index) => {
      this.checkedRowIndices[index] = false;
    });
    this.rowsComponent.subscribe(() => {
      this.rows = this.rowsComponent.rows;
      this.rows.forEach((row, index) => {
        this.checkedRowIndices[index] = false;
      });
    });
    this.paginationInfo = this.footerComponent.paginationInfo;
    this.rowsPerPage = this.rows.length;
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

    if (changeListState) {
      this.actionListState = 'hidden';
    }
  }

  public paginationAction(action: string, value) {
    this.footerComponent.invokePaginationAction({
      action, rowsPerPage: this.rowsPerPage
    });
  }

  public toggleOtherActionList(): void {
    this.actionListState = (this.actionListState === 'hidden') ? 'show': 'hidden';
  }

}
