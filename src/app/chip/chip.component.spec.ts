/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FrChipComponent } from './chips.component';

describe('FrChipComponent', () => {
  let component: FrChipComponent;
  let fixture: ComponentFixture<FrChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
