/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  FrCheckboxChange, FrCheckboxComponent
} from './checkbox.component';


describe('FrCheckboxComponent', () => {
  let component: FrCheckboxComponent;
  let fixture: ComponentFixture<FrCheckboxComponent>;

  beforeEach(waitForAsync(() => {
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
    component.change.subscribe(($event: FrCheckboxChange) => {
      expect($event instanceof FrCheckboxChange).toBeTruthy();
    });
    const event = new Event('click');
    component.onClick(event);
  });

  it('should NOT emit change event if disabled is true', () => {
    component.disabled = true;
    expect(component.disabled).toBeTruthy();
    component.change.subscribe((_$event: FrCheckboxChange) => {
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

  it ('should set indeterminate flag false when it is clicked', () => {
    component.indeterminate = true;
    expect(component.indeterminate).toBeTruthy();

    component.onClick(new Event('click'));
    expect(component.indeterminate).toBeFalsy();

    component.onClick(new Event('click'));
    expect(component.indeterminate).toBeFalsy();
  });
});
