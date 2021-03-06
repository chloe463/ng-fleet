import { Component, Input } from '@angular/core';

@Component({
  selector: 'fr-navbar-menu',
  template: ''
})
export class FrNavbarMenuComponent {

  @Input() link: string;
  @Input() title: string;

}
