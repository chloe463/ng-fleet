import {
  Component,
  OnInit,
  Input,
  ContentChildren,
  QueryList
} from '@angular/core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import { NavbarLogoComponent } from './navbar-logo.component';
import { NavbarItemComponent } from './navbar-item.component';

@Component({
  selector: 'fr-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [],
  providers: [Location, { provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class NavbarComponent implements OnInit {

  @ContentChildren(NavbarLogoComponent) _logos: QueryList<NavbarLogoComponent>;
  @ContentChildren(NavbarItemComponent) _items: QueryList<NavbarItemComponent>;

  constructor(private _location: Location) {
  }

  ngOnInit() {
  }

  private _isSelected(link: string) {
    return link.substr(1) === this._location.path();
  }
}
