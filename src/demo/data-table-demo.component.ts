import { Component } from '@angular/core';
import { FrDataTableEvent } from 'francette';

/* tslint:disable component-selector */
@Component({
  selector: 'data-table-demo',
  template: `
    <!-- Table Container -->
    <fr-data-table
      [selectable]="dataTableInfo.selectable"
      [sortable]="dataTableInfo.sortable"
      (dataTableAction)="dataTableAction($event)">

      <!-- Header component which contains title and action buttons -->
      <fr-data-table-header [title]="dataTableInfo.title" [actionKeys]="dataTableInfo.actionKeys"></fr-data-table-header>

      <!-- Define columns -->
      <fr-data-table-columns [columns]="dataTableInfo.columns"></fr-data-table-columns>

      <!-- Set Data rows -->
      <fr-data-table-rows [rows]="dataTableInfo.rows"></fr-data-table-rows>

      <!-- Footer component which contains pagination info and actions -->
      <fr-data-table-footer [paginationInfo]="dataTableInfo.paginationInfo" ></fr-data-table-footer>
    </fr-data-table>
  `
})
export class DataTableDemoComponent {

  public dataTableInfo = {
    selectable: true,
    sortable: true,
    title: 'DataTableTitle',
    actionKeys: [
      { key: 'action1', label: 'Action1' },
      { key: 'action2', label: 'Action2' },
      { key: 'action3', label: 'Action3-has-long-keys' }
    ],
    columns: [
      { key: 'column1', name: 'Column1 (number)', type: 'number' },
      { key: 'column2', name: 'Column2 (string)', type: 'string' },
      { key: 'column3', name: 'Column3 (number)', type: 'number' },
      { key: 'column4', name: 'Column4 (string)', type: 'string' },
      { key: 'column5', name: 'Column5 (number)', type: 'number' }
    ],
    rows: [
      { column1: 1, column2: 'value1', column3: 100, column4: '2017-03-01 00:00:00', column5: 999 },
      { column1: 2, column2: 'value2', column3: 100, column4: '2017-03-01 00:00:00', column5: 987 },
      { column1: 3, column2: 'value3', column3: 100, column4: '2017-03-01 00:00:00', column5: 989 }
    ],
    paginationInfo: {
      totalRows: 100,
      rowsPerPageValues: [10, 30, 50, 100],
      page: 1,
      rowsPerPage: 30
    }
  };

  public dataTableAction($event: FrDataTableEvent) {
    console.log($event);
  }

}
