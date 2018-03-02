import { async, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';

import { FrTooltipDirective } from './tooltip.directive';

describe('FrTooltipDirective', () => {
  it('should create', () => {
    const el = new ElementRef(document);
    let directive = new FrTooltipDirective(el);
    expect(directive).toBeTruthy();
  });

  it('should set position', () => {
    const el = new ElementRef(document);
    let directive = new FrTooltipDirective(el);
    directive.position = 'position';
    expect(directive.position).toBe('position');
  });

  it('should set message', () => {
    const el = new ElementRef(document);
    let directive = new FrTooltipDirective(el);
    directive.message = 'message';
    expect(directive.message).toBe('message');
  });
});
