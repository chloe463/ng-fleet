import { Directive, OnInit, Input } from '@angular/core';
import { IFrNavbarNode } from '../../navbar/navbar/navbar.model';

@Directive({
  selector: 'fr-side-nav-item'
})
export class FrSideNavItemDirective {
  @Input() node: IFrNavbarNode;
}
