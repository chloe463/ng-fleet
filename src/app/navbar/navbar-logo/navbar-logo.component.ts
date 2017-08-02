import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'fr-navbar-logo'
})
export class FrNavbarLogoDirective {

  @Input() link: string;
  @Input() title: string;

  constructor() {
    console.warn('fr-navbar-logo is deprecated. It will removed in v0.7.0');
  }
}
