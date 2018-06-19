/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FrKpiTableComponent } from './kpi-table.component';

describe('FrKpiTableComponent', () => {
  let component: FrKpiTableComponent;
  let fixture: ComponentFixture<FrKpiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrKpiTableComponent ],
      imports: [ CommonModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrKpiTableComponent);
    component = fixture.componentInstance;
    component.data = {
      dateList: [
        20170101, 20170102, 20170103, 20170104, 20170105, 20170106, 20170107
      ],
      kpi: [
        { name: 'row0', values: [1, 2, 3, 4, 5, 6, 7] },
        { name: 'row1', values: [2, 3, 4, 5, 6, 7, 8] },
        { name: 'row2', values: [3, 4, 5, 6, 7, 8, 9] },
      ]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
