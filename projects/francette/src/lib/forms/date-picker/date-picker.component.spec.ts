/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FrDatePickerComponent } from './date-picker.component';


describe('FrDatePickerComponent', () => {
  let component: FrDatePickerComponent;
  let fixture: ComponentFixture<FrDatePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FrDatePickerComponent ],
      imports: [NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrDatePickerComponent);
    component = fixture.componentInstance;
    component.value = new Date();
    component.calendarVisibility = 'hidden';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle visiblity', () => {
    expect(component.calendarVisibility).toBe('hidden');
    component.toggleCalendarVisibility();
    expect(component.calendarVisibility).toBe('show');
  });

  it('should NOT toggle visiblity when disabled', () => {
    component.disabled = true;
    expect(component.calendarVisibility).toBe('hidden');
    component.toggleCalendarVisibility();
    expect(component.calendarVisibility).toBe('hidden');
  });

  it('should judge date is today', () => {
    const today = new Date();
    expect(component.isToday(today)).toBeTruthy();
    const yesterDay = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() - 1);
    expect(component.isToday(yesterDay)).toBeFalsy();
  });

  it('should judge if the given date is selected date', () => {
    component.value = new Date(2017, 9, 1);
    expect(component.isSelected(new Date(2017, 9, 1))).toBeTruthy();
  });
});
