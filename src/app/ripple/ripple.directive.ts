import {
  Directive,
  ElementRef,
  HostListener,
  Input
} from '@angular/core';
import { timer } from 'rxjs/observable/timer';

@Directive({
  selector: '[frRipple]',
  host: {
    '[class.fr-ripple]': 'true'
  }
})
export class FrRippleDirective {

  @Input('frRipple') rippleColor: string;

  constructor(private _el: ElementRef) {
  }

  @HostListener('click', ['$event'])
  public onClick(event) {
    let element = this._el.nativeElement;

    let offsetLeft = element.offsetLeft;
    let offsetTop  = element.offsetTop;
    if (element.offsetParent.offsetTop) {
      offsetTop += element.offsetParent.offsetTop;
    }
    if (element.offsetParent.offsetLeft) {
      offsetLeft += element.offsetParent.offsetLeft;
    }

    const xPos = event.pageX - offsetLeft;
    const yPos = event.pageY - offsetTop;

    const rippleHeight = Math.max(element.clientWidth, element.clientHeight);
    const rippleWidth  = Math.max(element.clientWidth, element.clientHeight);

    const ripple = document.createElement('div');
    ripple.style.setProperty('background', this.rippleColor || 'white');
    ripple.style.setProperty('height', `${rippleHeight}px`);
    ripple.style.setProperty('width',  `${rippleWidth}px`);
    ripple.style.setProperty('top',    `${yPos - rippleHeight / 2}px`);
    ripple.style.setProperty('left',   `${xPos - rippleWidth / 2}px`);
    ripple.classList.add('fr-ripple-effect');
    element.appendChild(ripple);

    timer(1300).subscribe(() => {
      element.removeChild(ripple);
    });
  }

}
