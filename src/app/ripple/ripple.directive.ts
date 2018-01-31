import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input
} from '@angular/core';
import { timer } from 'rxjs/observable/timer';

@Directive({
  selector: '[frRipple]'
})
export class FrRippleDirective {

  @Input() rippleColor: string;

  @HostBinding('class.fr-ripple') private ripple = true;

  constructor(private _el: ElementRef) {
  }

  @HostListener('mousedown', ['$event'])
  public onClick(event: MouseEvent) {
    const element = this._el.nativeElement;

    const rippleHeight = Math.max(element.clientWidth, element.clientHeight);
    const rippleWidth  = Math.max(element.clientWidth, element.clientHeight);

    const rect = element.getBoundingClientRect();

    const top  = event.pageY - rect.top  - window.pageYOffset - (rippleHeight / 2);
    const left = event.pageX - rect.left - window.pageXOffset - (rippleWidth / 2);

    const ripple = document.createElement('div');
    ripple.style.setProperty('background', this.rippleColor || 'white');
    ripple.style.setProperty('height', `${rippleHeight}px`);
    ripple.style.setProperty('width',  `${rippleWidth}px`);
    ripple.style.setProperty('top',    `${top}px`);
    ripple.style.setProperty('left',   `${left}px`);
    ripple.classList.add('fr-ripple-effect');
    element.appendChild(ripple);

    timer(1300).subscribe(() => {
      element.removeChild(ripple);
    });
  }

}
