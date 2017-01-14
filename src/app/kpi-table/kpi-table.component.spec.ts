/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KpiTableComponent } from './kpi-table.component';

describe('KpiTableComponent', () => {
  let component: KpiTableComponent;
  let fixture: ComponentFixture<KpiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
