/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FrNavbarLogoDirective } from './navbar-logo.component';

describe('FrNavbarLogoDirective', () => {
  let component: FrNavbarLogoDirective;
  let fixture: ComponentFixture<FrNavbarLogoDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrNavbarLogoDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrNavbarLogoDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
