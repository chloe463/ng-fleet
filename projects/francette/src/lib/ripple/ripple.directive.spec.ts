/* tslint:disable:no-unused-variable */

import { ElementRef } from '@angular/core';
import { FrRippleDirective } from './ripple.directive';

class MockElementRef extends ElementRef {
  constructor(seed = {}) {
    super(seed);
  }
}

describe('FrRippleDirective', () => {

  it('should create an instance', () => {
    const directive = new FrRippleDirective(new MockElementRef());
    expect(directive).toBeTruthy();
  });

  it('should append ripple effect on pointer', () => {
    const mockElement = {
      clientWidth: 100,
      clientHeight: 100,
      getBoundingClientRect: () => ({ top: 50, left: 50 }),
      appendChild: (el: HTMLElement) => {
        expect(el.style.background).toBe('rgba(255, 255, 255, 0.8)');
        expect(el.style.height).toBe('100px');
        expect(el.style.width).toBe('100px');
        expect(el.style.top).toBe('-25px');
        expect(el.style.left).toBe('-25px');
      },
      removeChild: (el: HTMLLIElement) => {}
    };
    const directive = new FrRippleDirective(new MockElementRef(mockElement));
    directive.onClick(new MouseEvent('mousedown', { clientX: 25, clientY: 25 }));
  });

  it('should append ripple effect on center', () => {
    const mockElement = {
      clientWidth: 100,
      clientHeight: 100,
      getBoundingClientRect: () => ({ height: 100, width: 100 }),
      appendChild: (el: HTMLElement) => {
        expect(el.style.background).toBe('rgba(255, 255, 255, 0.8)');
        expect(el.style.height).toBe('100px');
        expect(el.style.width).toBe('100px');
        expect(el.style.top).toBe('0px');
        expect(el.style.left).toBe('0px');
      },
      removeChild: (el: HTMLLIElement) => {}
    };
    const directive = new FrRippleDirective(new MockElementRef(mockElement));
    directive.ripplePosition = 'center';
    directive.onClick(new MouseEvent('mousedown', { clientX: 30, clientY: 70 }));
  });
});
