import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { FrDataTableFooterComponent } from './data-table-footer.component';
import { FrSelectComponent, FrOptionComponent } from '../../forms/index';

describe('FrDataTableFooterComponent', () => {
  let component: SampleFrDataTableFooterComponent;
  let fixture: ComponentFixture<SampleFrDataTableFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FrSelectComponent,
        FrOptionComponent,
        FrDataTableFooterComponent,
        SampleFrDataTableFooterComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleFrDataTableFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have property \'paginationInfo\'', () => {
    fixture = TestBed.createComponent(SampleFrDataTableFooterComponent);
    component = fixture.componentInstance;
    expect(component.paginationInfo).toEqual({
      totalRows: 100,
      rowsPerPageValues: [10, 30, 50],
      page: 1
    });
  });
});

@Component({
  template: `
<fr-data-table-footer [paginationInfo]="paginationInfo"></fr-data-table-footer>
`
})
class SampleFrDataTableFooterComponent {
  paginationInfo = {
    totalRows: 100,
    rowsPerPageValues: [10, 30, 50],
    page: 1
  };
}
