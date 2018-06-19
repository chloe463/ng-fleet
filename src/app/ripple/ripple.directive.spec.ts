/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
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

  it('should append ripple effect', () => {
    const mockElement = {
      clientWidth: 100,
      clientHeight: 100,
      getBoundingClientRect: () => ({ top: 50, left: 50 }),
      appendChild: (el) => {
        expect(el.style.background).toBe('white');
        expect(el.style.height).toBe('100px');
        expect(el.style.width).toBe('100px');
        expect(el.style.top).toBe('-100px');
        expect(el.style.left).toBe('-100px');
      },
      removeChild: (el) => {}
    };
    const directive = new FrRippleDirective(new MockElementRef(mockElement));
    directive.onClick(new MouseEvent('mousedown'))
  })
});
