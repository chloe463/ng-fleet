import { Component, Input } from '@angular/core';
import { IFrNavbarNode } from '../navbar/navbar.model';

@Component({
  selector: 'fr-navbar-logo',
  template: ''
})
export class FrNavbarLogoComponent {
  @Input() logo: IFrNavbarNode;

  get title(): string {
    return this.logo.title;
  }

  get url(): string {
    return this.logo.url || "";
  }
}
