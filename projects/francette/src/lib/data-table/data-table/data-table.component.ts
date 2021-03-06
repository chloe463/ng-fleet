import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  AfterContentInit,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { FrDataTableColumnsComponent } from '../data-table-columns/data-table-columns.component';
import { FrDataTableFooterComponent, IFrPaginationInfo } from '../data-table-footer/data-table-footer.component';
import { FrDataTableHeaderComponent } from '../data-table-header/data-table-header.component';
import { FrDataTableRowsComponent } from '../data-table-rows/data-table-rows.component';

type DataTableIcon = 'edit' | 'delete' | 'dots' | 'chevronLeft' | 'chevronRight';

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
  @HostBinding('class.fr-data-table--stripe') stripe = true;
}

@Component({
  selector: 'fr-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
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
export class FrDataTableComponent implements AfterContentInit, OnDestroy {

  @HostBinding('class.fr-data-table-host') dataTableHost = true;

  @Input() selectable = false;
  @Input() sortable = false;

  @Output() dataTableAction: EventEmitter<FrDataTableEvent> = new EventEmitter<FrDataTableEvent>();

  @ViewChild('dots', { static: false }) dots: ElementRef;
  @ViewChild('pulldown', { static: false }) pulldown: ElementRef;

  @ContentChild(FrDataTableHeaderComponent, { static: true }) headerComponent: FrDataTableHeaderComponent;
  @ContentChild(FrDataTableColumnsComponent, { static: true }) columnsComponent: FrDataTableColumnsComponent;
  @ContentChild(FrDataTableRowsComponent, { static: true }) rowsComponent: FrDataTableRowsComponent;
  @ContentChild(FrDataTableFooterComponent, { static: true }) footerComponent: FrDataTableFooterComponent;

  public title = '';
  public columns: Array<any> = [];
  public rows: Array<any>    = [];
  public sortState = { column: null, order: 'asc' };

  public rowsPerPage: number;
  public paginationInfo: IFrPaginationInfo;

  public checkedRowIndices: any;
  public checkAllFlag: boolean;

  public actionListState = 'hidden';
  public rowsListState   = 'hidden';

  private _columnsSubscription: Subscription;
  private _rowsSubsctiption: Subscription;
  private _timerSubscription: Subscription;

  constructor(
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {
    this.ngZone.runOutsideAngular(() => this.hideActionListOnClick());
    this.ngZone.runOutsideAngular(() => this.hideActionListOnEscape());
  }

  ngAfterContentInit() {
    // this.title = this.headerComponent.title;
    if (this.headerComponent) {
      this.title = this.headerComponent.title;
    }
    if (this.columnsComponent) {
      this._columnsSubscription = this.columnsComponent.columns$.subscribe(newColumns => this.columns = newColumns);
    }
    if (this.rowsComponent) {
      this._rowsSubsctiption = this.rowsComponent.rows$.subscribe(newRows => this._updateRows(newRows));
    }
    if (this.footerComponent) {
      this.paginationInfo = this.footerComponent.paginationInfo;
      this.rowsPerPage    = this.paginationInfo.rowsPerPage;
    }
  }

  ngOnDestroy() {
    if (this._columnsSubscription instanceof Subscription) {
      this._columnsSubscription.unsubscribe();
    }
    if (this._rowsSubsctiption instanceof Subscription) {
      this._rowsSubsctiption.unsubscribe();
    }
  }

  private _updateRows(newRows: Array<any>): void {
    this.rows = newRows;
    this.checkedRowIndices = {};
    newRows.forEach((row, index) => {
      this.checkedRowIndices[index] = false;
    });
  }

  public isPartialSelect(): boolean {
    const trueCount = Object.values(this.checkedRowIndices).filter(v => v).length;
    if (trueCount === this.rows.length) {
      this._turnOnCheckAllFlag();
      return false;
    }
    this._turnOffCheckAllFlag();
    return trueCount !== 0;
  }

  private _turnOnCheckAllFlag(): void {
    this.checkAllFlag = true;
  }

  private _turnOffCheckAllFlag(): void {
    this.checkAllFlag = false;
  }

  public checkAll(): void {
    Object.keys(this.checkedRowIndices).forEach((index) => {
      this.checkedRowIndices[index] = this.checkAllFlag;
    });
  }

  public shouldDisplayHeaderButtons(): boolean {
    return this.countCheckedRows() !== 0;
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

  private _filterCheckedRows(): Array<any> {
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
      this._filterCheckedRows(),
      this.rowsPerPage,
      this.paginationInfo.page,
      {
        sortParams: { targetColumn, order: this.sortState.order }
      }
    );
    this.dataTableAction.emit(event);
  }

  public updateRowAction(updateAction: DataTableIcon, changeListState = false): void {
    const checkedRows = this._filterCheckedRows();
    const event = new FrDataTableEvent(updateAction, checkedRows, this.rowsPerPage, this.paginationInfo.page);
    if (this.dataTableAction) {
      this.dataTableAction.emit(event);
    }
  }

  public otherAction(key: string, $event: Event): void {
    $event.stopPropagation();
    const checkedRows = this._filterCheckedRows();
    const event = new FrDataTableEvent(key, checkedRows, this.rowsPerPage, this.paginationInfo.page);
    this.actionListState = 'hidden';
    if (this.dataTableAction) {
      this.dataTableAction.emit(event);
    }
  }

  public paginationAction(action: string, rowsPerPage?: number): void {
    const checkedRows = this._filterCheckedRows();
    const event = new FrDataTableEvent(action, checkedRows, this.rowsPerPage, this.paginationInfo.page);
    if (this.dataTableAction) {
      this.dataTableAction.emit(event);
    }
  }

  public toggleOtherActionList(): void {
    this.actionListState = (this.actionListState === 'hidden') ? 'show' : 'hidden';
  }

  public toggleRowsList(): void {
    this.rowsListState = (this.rowsListState === 'hidden') ? 'show' : 'hidden';
  }

  public hideActionListOnClick(): void {
    this.renderer.listen('document', 'click', (event: MouseEvent) => {
      if (!this.dots.nativeElement.contains(event.target) && this.actionListState !== 'hidden') {
        this.ngZone.run(() => {
          this.actionListState = 'hidden';
        });
      }
      if (!this.pulldown.nativeElement.contains(event.target) && this.rowsListState !== 'hidden') {
        this.ngZone.run(() => {
          this.rowsListState = 'hidden';
        });
      }
    });
  }

  public hideActionListOnEscape(): void {
    this.renderer.listen('window', 'keydown', (event: KeyboardEvent) => {
      if (event.code === 'Escape' && event.key === 'Escape' &&
        (this.actionListState !== 'hidden' || this.rowsListState !== 'hidden')
      ) {
        this.ngZone.run(() => {
          this.actionListState = 'hidden';
          this.rowsListState   = 'hidden';
        });
      }
    });
  }

}
