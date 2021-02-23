import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';

import { FrDataTableRowsComponent } from './data-table-rows.component';

describe('FrDataTableRowsComponent', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FrDataTableRowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const directive = new FrDataTableRowsComponent();
  });

  it('should create', () => {
    const directive = new FrDataTableRowsComponent();
    expect(directive).toBeTruthy();
  });

  it('should have property \'rows\'', () => {
    const directive = new FrDataTableRowsComponent();
    expect(directive.rows).toBeDefined();
    directive.rows = [
      { column11: 'value11', column12: 'value12' },
      { column21: 'value21', column22: 'value22' }
    ];
    expect(directive.rows).toEqual([
      { column11: 'value11', column12: 'value12' },
      { column21: 'value21', column22: 'value22' }
    ]);
  });

  it('should have property \'rows$\'', () => {
    const directive = new FrDataTableRowsComponent();
    expect(directive.rows$).toBeDefined();
    directive.rows = [];
    directive.rows$.subscribe((v) => {
      expect(v).toBeDefined();
      expect(v instanceof Array).toBeTruthy();
    }, () => {
      fail();
    });
    directive.rows = [
      { column11: 'value11', column12: 'value12' },
      { column21: 'value21', column22: 'value22' }
    ];
  });
});

