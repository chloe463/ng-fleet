import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';

import { FrDataTableColumnsComponent } from './data-table-columns.component';

describe('FrDataTableColumnsComponent', () => {
  it('should create an instance', () => {
    const directive = new FrDataTableColumnsComponent();
    expect(directive).toBeTruthy();
  });

  it('should have \'columns\'', () => {
    const directive = new FrDataTableColumnsComponent();
    expect(directive.columns).toEqual([]);
  });

  it('should have \'columns$\'', () => {
    const directive = new FrDataTableColumnsComponent();
    expect(directive.columns$).toBeDefined();
    expect(directive.columns$ instanceof ReplaySubject).toBeTruthy();
  });
});
