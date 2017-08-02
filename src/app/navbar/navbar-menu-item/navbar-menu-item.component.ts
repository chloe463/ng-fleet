import { Component } from '@angular/core';

@Component({
  selector: 'fr-navbar-menu-item',
  template: `
  <li class="fr-navbar__menu-item">
    <span class="fr-navbar__label">
      <ng-content></ng-content>
    </span>
  </li>
  `
})
export class FrNavbarMenuItemComponent { }
