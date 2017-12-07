import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { FrDataTableHeaderComponent } from './data-table-header.component';

describe('FrDataTableHeaderComponent', () => {
  it('should create an instance', () => {
    let directive = new FrDataTableHeaderComponent();
    expect(directive).toBeTruthy();
  });

  it('should have \'title\'', () => {
    let directive = new FrDataTableHeaderComponent();
    directive.title = 'TITLE';
    expect(directive.title).toBeDefined();
    expect(directive.title).toEqual('TITLE');
  });

  it('should have \'actionKeys\'', () => {
    let directive = new FrDataTableHeaderComponent();
    directive.actionKeys = [
      { key: 'action1', label: 'ACTION1' },
      { key: 'action2', label: 'ACTION2' }
    ];
    expect(directive.actionKeys).toBeDefined();
    expect(directive.actionKeys).toEqual([
      { key: 'action1', label: 'ACTION1' },
      { key: 'action2', label: 'ACTION2' }
    ]);
  });
});
