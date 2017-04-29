import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { FrDataTableHeaderComponent } from './data-table-header.component';

describe('FrDataTableHeaderComponent', () => {
  let component: SampleFrDataTableHeaderComponent;
  let fixture: ComponentFixture<SampleFrDataTableHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrDataTableHeaderComponent, SampleFrDataTableHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleFrDataTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should have property \'title\'', () => {
    fixture = TestBed.createComponent(SampleFrDataTableHeaderComponent);
    component = fixture.componentInstance;
    expect(component.title).toBe('some-title');
  });
});

@Component({
  template: '<fr-data-table-header [title]="title"></fr-data-table-header>'
})
class SampleFrDataTableHeaderComponent {
  title = 'some-title';
}
