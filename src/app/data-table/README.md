# DataTable

## Usage

```ts
@Component({
  selector: 'data-table-demo',
  template: `
    <fr-data-table [selectable]="true">
      <fr-data-table-header title="Header"
        (updateAction)="updateAction($event)"
        [otherActionKeys]="dataTableOtherActionKeys"
        (otherAction)="otherAction($event)"></fr-data-table-header>
      <fr-data-table-columns [columns]="columns"></fr-data-table-columns>
      <fr-data-table-rows [rows]="rows"></fr-data-table-rows>
      <fr-data-table-footer
        [paginationInfo]="paginationInfo"
        (paginationAction)="paginationAction($event)"></fr-data-table-footer>
    </fr-data-table>
  `
})
export class DataTableDemoComponent {

  dataTableOtherActionKeys = [
    { key: 'action1', label: 'Action1' },
    { key: 'action2', label: 'Action2' }
  ];
  columns = [
    { key: 'column1', name: 'Column1 (number)', type: 'number' },
    { key: 'column2', name: 'Column2 (string)', type: 'string' },
    { key: 'column3', name: 'Column3 (number)', type: 'number' },
    { key: 'column4', name: 'Column4 (string)', type: 'string' },
    { key: 'column5', name: 'Column5 (number)', type: 'number' }
  ];
  rows = [
    { column1: 1, column2: 'value1', column3: 100, column4: '2017-03-01 00:00:00', column5: 999 },
    { column1: 2, column2: 'value2', column3: 100, column4: '2017-03-01 00:00:00', column5: 987 },
    { column1: 3, column2: 'value3', column3: 100, column4: '2017-03-01 00:00:00', column5: 989 }
  ];
  paginationInfo = {
    totalRows: 100,
    rowsPerPageValues: [10, 30, 50],
    page: 1 
  };

  public updateAction(event) {
    // do something
  }

  public otherAction(event) {
    // do something
  }

  public paginationAction(event) {
    // do something
  }

}

```
