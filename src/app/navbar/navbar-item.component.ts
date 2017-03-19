import {
  Component,
  OnInit,
  Input,
  ContentChildren,
  QueryList
} from '@angular/core';

import { FrNavbarMenuComponent } from './navbar-menu.component';

@Component({
  selector: 'fr-navbar-item',
  template: `<ng-content></ng-content>`
})
export class FrNavbarItemComponent implements OnInit {

  @ContentChildren(FrNavbarMenuComponent) menus: QueryList<FrNavbarMenuComponent>;

  @Input() title: string;
  @Input() link: string;

  constructor() { }

  ngOnInit() {
  }

}
