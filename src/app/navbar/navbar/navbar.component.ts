import {
  Component,
  OnInit,
  Input,
  ContentChildren,
  ContentChild,
  QueryList
} from '@angular/core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import { FrNavbarLogoDirective } from '../navbar-logo/navbar-logo.component';
import { FrNavbarItemDirective } from '../navbar-item/navbar-item.component';

import { FrSideNavComponent } from '../../side-nav/side-nav/side-nav.component';

@Component({
  selector: 'fr-navbar',
  templateUrl: './navbar.component.html',
  providers: [Location, { provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class FrNavbarComponent implements OnInit {

  @ContentChildren(FrNavbarLogoDirective) logos: QueryList<FrNavbarLogoDirective>;
  @ContentChildren(FrNavbarItemDirective) items: QueryList<FrNavbarItemDirective>;
  @ContentChild(FrSideNavComponent) sideNav: FrSideNavComponent;

  @Input() withSideBar: boolean;

  constructor(private _location: Location) {
  }

  ngOnInit() {
  }

  public toggleSideNav(): void {
    this.sideNav.toggleVisibility();
  }
}
