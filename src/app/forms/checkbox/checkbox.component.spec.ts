/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  FrCheckboxComponent,
  FrCheckboxChange
} from './checkbox.component';

describe('FrCheckboxComponent', () => {
  let component: FrCheckboxComponent;
  let fixture: ComponentFixture<FrCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrCheckboxComponent ],
      imports: [ NoopAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit change event', () => {
    component.change.subscribe($event => {
      expect($event instanceof FrCheckboxChange).toBeTruthy();
    });
    const event = new Event('click');
    component.onClick(event);
  });

  it('should NOT emit change event if disabled is true', () => {
    component.disabled = true;
    component.change.subscribe($event => {
      fail();
    });
    const event = new Event('click');
    component.onClick(event);
  });

  it ('should toggle `focus` flag', () => {
    component.onFocus(new Event('click'));
    expect(component.isFocused).toBeTruthy();

    component.onBlur(new Event('click'));
    expect(component.isFocused).toBeFalsy();
  });
});
