/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FrNavbarItemDirective } from './navbar-item.component';

describe('FrNavbarItemDirective', () => {
  let component: FrNavbarItemDirective;
  let fixture: ComponentFixture<FrNavbarItemDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrNavbarItemDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrNavbarItemDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
