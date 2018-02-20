import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { FrRippleModule } from '../../ripple/ripple.module';
import { FrDataTableFooterComponent } from './data-table-footer.component';

describe('FrDataTableFooterComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrDataTableFooterComponent ],
      imports: [ FrRippleModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const component = new FrDataTableFooterComponent();
  });

  it('should create', () => {
    const component = new FrDataTableFooterComponent();
    expect(component).toBeTruthy();
  });

  it('should have \'paginationInfo\'', () => {
    const component = new FrDataTableFooterComponent();
    component.paginationInfo = {
      totalRows: 100,
      rowsPerPageValues: [10, 30, 50],
      rowsPerPage: 10,
      page: 1
    };
    expect(component.paginationInfo).toEqual({
      totalRows: 100,
      rowsPerPageValues: [10, 30, 50],
      rowsPerPage: 10,
      page: 1
    });
  });

});
