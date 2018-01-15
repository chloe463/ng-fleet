import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { FrDataTableFooterComponent } from './data-table-footer.component';
import { FrSelectComponent, FrOptionComponent } from '../../forms/index';

describe('FrDataTableFooterComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FrSelectComponent,
        FrOptionComponent,
        FrDataTableFooterComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let directive = new FrDataTableFooterComponent();
  });

  it('should create', () => {
    let directive = new FrDataTableFooterComponent();
    expect(directive).toBeTruthy();
  });

  it('should have \'paginationInfo\'', () => {
    let directive = new FrDataTableFooterComponent();
    directive.paginationInfo = {
      totalRows: 100,
      rowsPerPageValues: [10, 30, 50],
      rowsPerPage: 10,
      page: 1
    };
    expect(directive.paginationInfo).toEqual({
      totalRows: 100,
      rowsPerPageValues: [10, 30, 50],
      rowsPerPage: 10,
      page: 1
    });
  });

});
