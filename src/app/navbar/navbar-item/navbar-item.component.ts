import {
  Directive,
  Input,
  ContentChildren,
  QueryList
} from '@angular/core';

import { FrNavbarMenuDirective } from '../navbar-menu/navbar-menu.component';

@Directive({
  selector: 'fr-navbar-item'
})
export class FrNavbarItemDirective {

  @ContentChildren(FrNavbarMenuDirective) menus: QueryList<FrNavbarMenuDirective>;

  @Input() title: string;
  @Input() link: string;

}
