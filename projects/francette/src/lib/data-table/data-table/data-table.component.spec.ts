import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FrRippleModule } from '../../ripple/ripple.module';
import { FrDataTableColumnsComponent } from '../data-table-columns/data-table-columns.component';
import { FrDataTableFooterComponent } from '../data-table-footer/data-table-footer.component';
import { FrDataTableHeaderComponent } from '../data-table-header/data-table-header.component';
import { FrDataTableRowsComponent } from '../data-table-rows/data-table-rows.component';
import { FrFormsModule } from './../../forms/forms.module';
import { FrDataTableComponent } from './data-table.component';


describe('FrDataTableComponent', () => {
  let component: FrDataTableComponent;
  let fixture: ComponentFixture<FrDataTableComponent>;
  // let component: SampleFrDataTableComponent;
  // let fixture: ComponentFixture<SampleFrDataTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FrDataTableComponent,
        FrDataTableColumnsComponent,
        FrDataTableFooterComponent,
        FrDataTableHeaderComponent,
        FrDataTableRowsComponent,
        SampleFrDataTableComponent
      ],
      imports: [ FormsModule, FrFormsModule, FrRippleModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should checkAll rows flags', () => {
  //   expect(component.checkedRowIndices).toBeDefined();
  // });
});

@Component({
  template: `
<fr-data-table [selectable]="true">
  <fr-data-table-header title="Header" (updateAction)="updateAction($event)"></fr-data-table-header>
  <fr-data-table-columns [columns]="records.columns"></fr-data-table-columns>
  <fr-data-table-rows [rows]="records.rows"></fr-data-table-rows>
  <fr-data-table-footer
    [paginationInfo]="{ totalRows: 100, rowsPerPageValues: [10, 30, 50], page: 1 }"
    (paginationAction)="paginationAction($event)"></fr-data-table-footer>
</fr-data-table>
`
})
class SampleFrDataTableComponent {
  records = {
    columns: [
      { name: 'column1', type: 'number' },
      { name: 'column2', type: 'string' },
      { name: 'column3', type: 'number' },
      { name: 'column4', type: 'string' },
      { name: 'column5', type: 'number' },
    ],
    rows: [
      { column1: 1, column2: 'value1', column3: 100, column4: '2017-03-01 00:00:00', column5: 999 },
      { column1: 2, column2: 'value2', column3: 100, column4: '2017-03-01 00:00:00', column5: 987 },
      { column1: 3, column2: 'value3', column3: 100, column4: '2017-03-01 00:00:00', column5: 989 }
    ]
  };

  updateAction(event: any) {
  }
  paginationAction(event: any) {
  }
}
