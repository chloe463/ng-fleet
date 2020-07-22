import {
  Component,
  OnInit,
  Input,
  ContentChildren,
  ContentChild,
  QueryList
} from '@angular/core';
import { FrNavbarLogoComponent } from '../navbar-logo/navbar-logo.component';
import { FrNavbarItemComponent } from '../navbar-item/navbar-item.component';

import { FrSideNavComponent } from '../../side-nav/side-nav/side-nav.component';

@Component({
  selector: 'fr-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class FrNavbarComponent implements OnInit {

  @ContentChildren(FrNavbarLogoComponent) logos: QueryList<FrNavbarLogoComponent>;
  @ContentChildren(FrNavbarItemComponent) items: QueryList<FrNavbarItemComponent>;
  @ContentChild(FrSideNavComponent, { static: true }) sideNav: FrSideNavComponent;

  @Input() withSideBar: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  public toggleSideNav(): void {
    this.sideNav.toggleVisibility();
  }
}
