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
  providers: [Location, { provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class FrNavbarComponent implements OnInit {

  @ContentChildren(FrNavbarLogoComponent) logos: QueryList<FrNavbarLogoComponent>;
  @ContentChildren(FrNavbarItemComponent) items: QueryList<FrNavbarItemComponent>;

  constructor(private _location: Location) {
  }

  ngOnInit() {
  }
}
