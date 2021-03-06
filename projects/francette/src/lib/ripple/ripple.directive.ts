import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input
} from '@angular/core';

const DEFAULT_RIPPLE_COLOR = 'rgba(255, 255, 255, 0.8)';
export type RipplePosition = 'onPointer' | 'center';

@Directive({
  selector: '[frRipple]'
})
export class FrRippleDirective {

  @Input() rippleColor = DEFAULT_RIPPLE_COLOR;
  @Input() ripplePosition: RipplePosition = 'onPointer';

  @HostBinding('class.fr-ripple') private ripple = true;

  constructor(private _el: ElementRef) {
  }

  @HostListener('mousedown', ['$event'])
  public onClick(event: MouseEvent) {
    const element: HTMLElement = this._el.nativeElement;

    let rippleRadius = Math.max(element.clientWidth, element.clientHeight);
    if (element.clientHeight * 10 < element.clientWidth) {
      rippleRadius = element.clientWidth / 1.8;
    }

    const rect = element.getBoundingClientRect();

    let top = event.offsetY - (rippleRadius / 2);
    let left = event.offsetX - (rippleRadius / 2);
    if (this.ripplePosition === 'center') {
      top = (rect.height - rippleRadius) / 2;
      left = (rect.width - rippleRadius) / 2;
    }

    const ripple = document.createElement('div');
    ripple.style.setProperty('background', this.rippleColor);
    ripple.style.setProperty('height', `${rippleRadius}px`);
    ripple.style.setProperty('width', `${rippleRadius}px`);
    ripple.style.setProperty('top', `${top}px`);
    ripple.style.setProperty('left', `${left}px`);
    ripple.classList.add('fr-ripple-effect');
    element.appendChild(ripple);

    setTimeout(() => element.removeChild(ripple), 1300);
  }

}
