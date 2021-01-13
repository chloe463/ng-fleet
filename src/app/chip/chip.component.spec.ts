/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FrChipComponent } from './chip.component';

describe('FrChipComponent', () => {
  let component: FrChipComponent;
  let fixture: ComponentFixture<FrChipComponent>;

  beforeEach(waitForAsync(() => {
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

  it('should emit event', () => {
    component.dismiss.subscribe((value) => {
      expect(value).toBeUndefined();
    });
    component.disappear();
  });

  it('should toggle flag', () => {
    expect(component.on).toBeFalsy();
    component.toggleOn();
    expect(component.on).toBeTruthy();
  });
});
