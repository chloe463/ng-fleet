import { Directive, Input } from '@angular/core';
import { IFrNavbarNode } from '../navbar/navbar.model';

@Directive({
  selector: 'fr-navbar-logo'
})
export class FrNavbarLogoDirective {
  @Input() logo: IFrNavbarNode;

  get title(): string {
    return this.logo.title;
  }

  get url(): string {
    return this.logo.url;
  }
}
