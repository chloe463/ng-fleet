import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'fr-navbar-logo'
})
export class FrNavbarLogoDirective {

  @Input() link: string;
  @Input() title: string;

}
