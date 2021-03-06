import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FrInputFileComponent } from './file.component';
import { FrRippleModule } from './../../ripple/ripple.module';

describe('FrInputFileComponent', () => {
  let component: FrInputFileComponent;
  let fixture: ComponentFixture<FrInputFileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FrInputFileComponent ],
      imports: [ FrRippleModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build Regexp', () => {
    const result = component.buildRegexp('image/*');
    expect(result instanceof RegExp).toBeTruthy();
    expect(result.toString()).toBe('/image\\/.*/');
    expect(component.buildRegexp('image/a+b').toString()).toBe('/image\\/a\\+b/');
    expect(component.buildRegexp('image/*,video/*').toString()).toBe('/image\\/.*|video\\/.*/');
  });

  it('should judge if dropArea is needed', () => {
    component.disabled = false;
    component.dropArea = true;
    expect(component.needDropArea()).toBeTruthy();

    component.disabled = true;
    component.dropArea = true;
    expect(component.needDropArea()).toBeFalsy();

    component.disabled = true;
    component.dropArea = false;
    expect(component.needDropArea()).toBeFalsy();

    component.disabled = false;
    component.dropArea = false;
    expect(component.needDropArea()).toBeFalsy();
  });

  it('should convert unit', () => {
    expect(component.setUnit(100)).toBe('0.1 KB');
    expect(component.setUnit(1000)).toBe('1.0 KB');
    expect(component.setUnit(10000)).toBe('10.0 KB');
    expect(component.setUnit(1000000)).toBe('1.0 MB');
    expect(component.setUnit(1000000000)).toBe('1.0 GB');
    expect(component.setUnit(1000000000000)).toBe('1.0 TB');
    expect(component.setUnit(1000000000000000)).toBe('1.0 PB');
    expect(component.setUnit(10000000000000000)).toBe('10.0 PB');
  });

  it('should update value', () => {
    component.multiple = true;
    const input = [
      new File(['dummy1'], 'dummy1', { type: 'image/png' }),
      new File(['dummy2'], 'dummy2', { type: 'image/jpeg' })
    ];
    component.updateValue(input);
    expect(component.value).toEqual(input);
  });

  it('should update value...throw Error', () => {
    expect(component.updateValue([])).toBeUndefined();

    component.multiple = false;
    try {
      expect(component.updateValue([
        new File(['dummy1'], 'dummy1'),
        new File(['dummy2'], 'dummy2')
      ])).toBeUndefined();
      fail();
    } catch (err) {
      expect(err.toString()).toBe('Error: It does NOT accept multiple files');
    }
  });

  it('should update value...it can filter files', () => {
    component.multiple = true;
    const input = [
      new File(['dummy1'], 'dummy1', { type: 'image/png' }),
      new File(['dummy2'], 'dummy2', { type: 'image/jpeg' })
    ];
    component.accept = 'image/png';
    component.acceptRegexp = component.buildRegexp('image/png');
    try {
      component.updateValue(input);
      fail();
    } catch (err) {
      expect(err.toString()).toBe('Error: image/jpeg is NOT acceptable.\nPlease put image/png file(s).');
    }
  });
});
