import { Component } from '@angular/core';

@Component({
  selector: 'fr-navbar-item',
  template: `
  <li class="fr-navbar__item">
    <span class="fr-navbar__label">
      <ng-content></ng-content>
    </span>
  </li>
  `
})
export class FrNavbarItemComponent { }

@Component({
  selector: 'fr-navbar-right-item',
  template: `
  <li class="fr-navbar__item">
    <span class="fr-navbar__label">
      <ng-content></ng-content>
    </span>
  </li>
  `
})
export class FrNavbarRightItemComponent { }
