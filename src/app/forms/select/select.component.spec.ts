/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FrRippleModule } from './../../ripple/ripple.module';
import { FrSelectComponent } from './select.component';

describe('FrSelectComponent', () => {
  let component: FrSelectComponent;
  let fixture: ComponentFixture<FrSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrSelectComponent ],
      imports: [ NoopAnimationsModule, FrRippleModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
