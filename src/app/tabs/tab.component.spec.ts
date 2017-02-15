/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FrTabComponent } from './tab.component';

describe('FrTabComponent', () => {
  let component: FrTabComponent;
  let fixture: ComponentFixture<FrTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
