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
import { FrNavbarLogoComponent } from './navbar-logo.component';
import { FrNavbarItemComponent } from './navbar-item.component';

@Component({
  selector: 'fr-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [],
  providers: [Location, { provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class FrNavbarComponent implements OnInit {

  @ContentChildren(FrNavbarLogoComponent) _logos: QueryList<FrNavbarLogoComponent>;
  @ContentChildren(FrNavbarItemComponent) _items: QueryList<FrNavbarItemComponent>;

  constructor(private _location: Location) {
  }

  ngOnInit() {
  }

  private _isSelected(link: string) {
    return link.substr(1) === this._location.path();
  }
}
