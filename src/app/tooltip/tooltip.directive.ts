import {
  Component,
  Directive,
  ElementRef,
  Input,
  HostBinding,
  HostListener,
  Output,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[frTooltip]'
})
export class FrTooltipDirective implements OnInit {

  @HostBinding('class.fr-tooltip') true;

  private _message: string = '';
  private _position: string = 'top';

  private tooltip: any;

  constructor(private _el: ElementRef) {}

  ngOnInit() {
    const element = this._el.nativeElement;
    const tooltip = document.createElement('span');
    const textContent = document.createTextNode(this.message);

    tooltip.classList.add('fr-tooltip__content');
    tooltip.appendChild(textContent);
    element.appendChild(tooltip);

    this.tooltip = tooltip;
  }

  @Input()
  set position(_position) {
    this._position = _position;
  }
  get position(): string {
    return this._position;
  }

  @Input()
  set message(_message) {
    this._message = _message;
  }
  get message(): string {
    return this._message;
  }

  @HostListener('mouseenter', ['$event'])
  public onMouseOver(event): void {
    this.tooltip.classList.add(`fr-tooltip__content--${this.position}`);
  }

  @HostListener('mouseleave', ['$event'])
  public onMouseLeave(): void {
    this.tooltip.classList.remove(`fr-tooltip__content--${this.position}`);
  }
}