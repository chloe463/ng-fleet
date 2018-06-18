import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';

import { FrDataTableColumnsComponent } from './data-table-columns.component';

describe('FrDataTableColumnsComponent', () => {
  it('should create an instance', () => {
    let directive = new FrDataTableColumnsComponent();
    expect(directive).toBeTruthy();
  });

  it('should have \'columns\'', () => {
    let directive = new FrDataTableColumnsComponent();
    expect(directive.columns).toEqual([]);
  });

  it('should have \'columns$\'', () => {
    let directive = new FrDataTableColumnsComponent();
    expect(directive.columns$).toBeDefined();
    expect(directive.columns$ instanceof ReplaySubject).toBeTruthy();
  });
});
