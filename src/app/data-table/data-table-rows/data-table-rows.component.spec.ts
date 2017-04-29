import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { FrDataTableRowsComponent } from './data-table-rows.component';

describe('FrDataTableRowsComponent', () => {
  let component: SampleFrDataTableRowsComponent;
  let fixture: ComponentFixture<SampleFrDataTableRowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrDataTableRowsComponent, SampleFrDataTableRowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleFrDataTableRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have property \'rows\'', () => {
    fixture = TestBed.createComponent(SampleFrDataTableRowsComponent);
    component = fixture.componentInstance;
    expect(component.rows).toEqual([
      { column1: 1, column2: 'value1', column3: 100 },
      { column1: 2, column2: 'value2', column3: 100 },
      { column1: 3, column2: 'value3', column3: 100 }
    ]);
  });
});

@Component({
  template: '<fr-data-table-rows [rows]="rows"></fr-data-table-rows>'
})
class SampleFrDataTableRowsComponent {
  rows = [
    { column1: 1, column2: 'value1', column3: 100 },
    { column1: 2, column2: 'value2', column3: 100 },
    { column1: 3, column2: 'value3', column3: 100 }
  ];
}
