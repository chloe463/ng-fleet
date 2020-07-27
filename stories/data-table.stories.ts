import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  FrDataTableColumnsComponent,
  FrDataTableComponent,
  FrDataTableFooterComponent,
  FrDataTableHeaderComponent,
  FrDataTableRowsComponent,
} from "../src/app/data-table";
import { FrCheckboxComponent } from "../src/app/forms/checkbox/checkbox.component";
import { FrRippleDirective } from "../src/app/ripple/ripple.directive";

export default {
  title: "Data table",
};

const dataTableInfo = {
  selectable: true,
  sortable: true,
  title: "DataTableTitle",
  actionKeys: [
    { key: "action1", label: "Action1" },
    { key: "action2", label: "Action2" },
    { key: "action3", label: "Action3-has-long-keys" },
  ],
  columns: [
    { key: "column1", name: "Column1 (number)", type: "number" },
    { key: "column2", name: "Column2 (string)", type: "string" },
    { key: "column3", name: "Column3 (number)", type: "number" },
    { key: "column4", name: "Column4 (string)", type: "string" },
    { key: "column5", name: "Column5 (number)", type: "number" },
  ],
  rows: [
    {
      column1: 1,
      column2: "value1",
      column3: 100,
      column4: "2017-03-01 00:00:00",
      column5: 999,
    },
    {
      column1: 2,
      column2: "value2",
      column3: 100,
      column4: "2017-03-01 00:00:00",
      column5: 987,
    },
    {
      column1: 3,
      column2: "value3",
      column3: 100,
      column4: "2017-03-01 00:00:00",
      column5: 989,
    },
  ],
  paginationInfo: {
    totalRows: 100,
    rowsPerPageValues: [10, 30, 50, 100],
    page: 1,
    rowsPerPage: 30,
  },
};

export const Datatable = () => ({
  moduleMetadata: {
    declarations: [
      FrDataTableComponent,
      FrDataTableHeaderComponent,
      FrDataTableRowsComponent,
      FrDataTableColumnsComponent,
      FrDataTableFooterComponent,
      FrRippleDirective,
      FrCheckboxComponent,
    ],
    imports: [
      BrowserAnimationsModule,
    ],
  },
  props: {
    selectable: true,
    sortable: true,
    dataTableAction: (e) => console.log(e),
    title: "DataTable",
    actionKeys: dataTableInfo.actionKeys,
    columns: dataTableInfo.columns,
    rows: dataTableInfo.rows,
    paginationInfo: dataTableInfo.paginationInfo,
  },
  template: `
    <!-- Table Container -->
    <fr-data-table
      [selectable]="selectable"
      [sortable]="sortable"
      (dataTableAction)="dataTableAction($event)">

      <!-- Header component which contains title and action buttons -->
      <fr-data-table-header [title]="title" [actionKeys]="actionKeys"></fr-data-table-header>

      <!-- Define columns -->
      <fr-data-table-columns [columns]="columns"></fr-data-table-columns>

      <!-- Set Data rows -->
      <fr-data-table-rows [rows]="rows"></fr-data-table-rows>

      <!-- Footer component which contains pagination info and actions -->
      <fr-data-table-footer [paginationInfo]="paginationInfo" ></fr-data-table-footer>
    </fr-data-table>
  `,
});
