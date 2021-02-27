import { Component, Input } from '@angular/core';
import { IFrNavbarNode } from '../../navbar/navbar/navbar.model';

@Component({
  selector: 'fr-side-nav-item',
  template: ''
})
export class FrSideNavItemComponent {
  @Input() node: IFrNavbarNode;
}
