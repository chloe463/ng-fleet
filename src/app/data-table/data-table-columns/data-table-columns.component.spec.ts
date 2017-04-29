import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { FrDataTableColumnsComponent } from './data-table-columns.component';

describe('FrDataTableColumnsComponent', () => {
  let component: SampleFrDataTableColumnsComponent;
  let fixture: ComponentFixture<SampleFrDataTableColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FrDataTableColumnsComponent,
        SampleFrDataTableColumnsComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleFrDataTableColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have property \'columns\'', () => {
    fixture = TestBed.createComponent(SampleFrDataTableColumnsComponent);
    component = fixture.componentInstance;
    expect(component.columns).toEqual([
      { name: 'column1', type: 'number' },
      { name: 'column2', type: 'string' },
      { name: 'column3', type: 'number' }
    ]);
  });
});

@Component({
  template: `
<fr-data-table-columns [columns]="columns"></fr-data-table-columns>
  `
})
class SampleFrDataTableColumnsComponent {
  columns = [
    { name: 'column1', type: 'number' },
    { name: 'column2', type: 'string' },
    { name: 'column3', type: 'number' }
  ];
}
