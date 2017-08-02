import { Component, Input } from '@angular/core';

@Component({
  selector: 'fr-navbar-menu',
  template: `
  <li class="fr-navbar__item">
    <span class="fr-navbar__label">{{title}}</span>
    <ul class="fr-navbar__menu">
      <ng-content selector="fr-navbar-menu-item"></ng-content>
    </ul>
  </li>
  `
})
export class FrNavbarMenuComponent {

  @Input() title: string;

}
