import {
  Component,
  Directive,
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
  HostBinding,
  HostListener
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { timer } from 'rxjs/observable/timer';

import { FrDataTableColumnsComponent, IFrDataTableColumn } from '../data-table-columns/data-table-columns.component';
import { FrDataTableHeaderComponent } from '../data-table-header/data-table-header.component';
import { FrDataTableRowsComponent } from '../data-table-rows/data-table-rows.component';
import { FrDataTableFooterComponent } from '../data-table-footer/data-table-footer.component';

export class FrDataTableEvent {
  constructor(
    public action: string,
    public rows: Array<any>,
    public rowsPerPage: number,
    public page: number,
    public extraParam?: any
  ) {}

  /**
   * For backward compatibility
   */
  get row(): Array<any> {
    return this.rows;
  }
}

@Directive({
  selector: 'fr-data-table[frDataTableStripe]'
})
export class FrDataTableStripeDirective {
  @HostBinding('class.fr-data-table--stripe') true;
}


@Component({
  selector: 'fr-data-table',
  templateUrl: './data-table.component.html',
  animations: [
    trigger('actionListState', [
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0.8)',
        'pointer-events': 'none'
      })),
      state('show', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('hidden => show', [
        animate('500ms cubic-bezier(0.35, 0.25, 0, 1)')
      ]),
      transition('show => hidden', [
        animate(
          '500ms 300ms cubic-bezier(0.35, 0.25, 0, 1)',
          style({
            opacity: 0,
            top: '-20px'
          })
        )
      ])
    ]),
    trigger('rowsListState', [
      state('hidden', style({
        opacity: 0,
        transform: 'scaleY(.86)',
        'transform-origin': '5% 0',
        'pointer-events': 'none'
      })),
      state('show', style({
        opacity: 1,
        transform: 'scaleY(1)',
      })),
      transition('hidden => show', [
        animate('500ms cubic-bezier(0.35, 0.25, 0, 1)')
      ]),
      transition('show => hidden', [
        animate(
          '500ms 200ms cubic-bezier(0.35, 0.25, 0, 1)',
          style({
            opacity: 0,
            top: '-15px'
          })
        )
      ])
    ])
  ]
})
export class FrDataTableComponent implements AfterContentInit {

  @Input() selectable = false;
  @Input() sortable = false;

  @Output() dataTableAction: EventEmitter<FrDataTableEvent> = new EventEmitter<FrDataTableEvent>();

  @ViewChild('dots') dots: ElementRef;
  @ViewChild('pulldown') pulldown: ElementRef;

  @ContentChild(FrDataTableHeaderComponent) headerComponent: FrDataTableHeaderComponent;
  @ContentChild(FrDataTableColumnsComponent) columnsComponent: FrDataTableColumnsComponent;
  @ContentChild(FrDataTableRowsComponent) rowsComponent: FrDataTableRowsComponent;
  @ContentChild(FrDataTableFooterComponent) footerComponent: FrDataTableFooterComponent;

  public title = '';
  public columns: Array<any> = [];
  public rows: Array<any>    = [];
  public sortState = { column: null, order: 'asc' };

  public rowsPerPage: number;
  public paginationInfo;

  public checkedRowIndices: any;
  public checkAllFlag: boolean;

  public actionListState = 'hidden';
  public rowsListState   = 'hidden';

  public ripples = { edit: false, delete: false, dots: false, chevronLeft: false, chevronRight: false };

  ngAfterContentInit() {
    // this.title = this.headerComponent.title;
    if (this.headerComponent) {
      this.title = this.headerComponent.title;
    }
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
    this.activateRippleEffect(updateAction);
    if (this.dataTableAction) {
      this.dataTableAction.emit(event);
    }
  }

  public otherAction(key: string): void {
    const checkedRows = this._extraceCheckedRows();
    const event = new FrDataTableEvent(key, checkedRows, this.rowsPerPage, this.paginationInfo.page);
    this.actionListState = 'hidden';
    if (this.dataTableAction) {
      this.dataTableAction.emit(event);
    }
  }

  public paginationAction(action: string, rowsPerPage?): void {
    const direction = action === 'showPreviousPage' ? 'chevronLeft' : 'chevronRight';
    if (rowsPerPage) {
      this.rowsPerPage = rowsPerPage;
    }
    this.activateRippleEffect(direction);
    const checkedRows = this._extraceCheckedRows();
    const event = new FrDataTableEvent(action, checkedRows, this.rowsPerPage, this.paginationInfo.page);
    if (this.dataTableAction) {
      this.dataTableAction.emit(event);
    }
  }

  public toggleOtherActionList(): void {
    this.activateRippleEffect('dots');
    this.actionListState = (this.actionListState === 'hidden') ? 'show' : 'hidden';
  }

  public toggleRowsList(): void {
    this.rowsListState = (this.rowsListState === 'hidden') ? 'show' : 'hidden';
  }

  private activateRippleEffect(key: string): void {
    this.ripples[key] = true;
    timer(800).subscribe(() => {
      this.ripples[key] = false;
    });
  }

  @HostListener('document:click', ['$event'])
  public hideActionListOnClick(event): void {
    if (!this.dots.nativeElement.contains(event.target)) {
      this.actionListState = 'hidden';
    }
    if (!this.pulldown.nativeElement.contains(event.target)) {
      this.rowsListState   = 'hidden';
    }
  }

  @HostListener('window:keydown', ['$event'])
  public hideActionListOnEscape(event): void {
    if (event.code === 'Escape' && event.key === 'Escape') {
      this.actionListState = 'hidden';
      this.rowsListState   = 'hidden';
    }
  }

}
