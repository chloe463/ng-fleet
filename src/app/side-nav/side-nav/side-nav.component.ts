import {
  Component,
  OnInit,
  Input,
  ContentChildren,
  QueryList,
  trigger,
  state,
  style,
  transition,
  animate,
  HostListener
} from '@angular/core';

import { FrSideNavItemGroupComponent } from '../side-nav-item-group/side-nav-item-group.component';
import { FrSideNavItemComponent } from '../side-nav-item/side-nav-item.component';

@Component({
  selector: 'fr-side-nav',
  templateUrl: './side-nav.component.html',
  animations: [
    trigger('barState', [
      state('inactive', style({
        transform: 'translate3d(-100%,0,0)'
      })),
      state('active', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('inactive => active, active => inactive', [
        animate('500ms cubic-bezier(0.35, 0.25, 0, 1)')
      ])
    ]),
    trigger('curtainState', [
      state('inactive', style({
        display: 'none',
        opacity: 0
      })),
      state('active', style({
        display: 'block',
        opacity: 1
      })),
      transition('inactive => active, active => inactive', [
        animate('250ms cubic-bezier(0.35, 0.25, 0, 1)')
      ])
    ])
  ]
})
export class FrSideNavComponent implements OnInit {

  @ContentChildren(FrSideNavItemGroupComponent) itemGroups: QueryList<FrSideNavItemGroupComponent>;

  public barState     = 'inactive';
  public curtainState = 'inactive';

  constructor() { }

  public sideBarVisibility = false;

  ngOnInit() {
  }

  public toggleVisibility(): void {
    this.sideBarVisibility = !this.sideBarVisibility;
    this.barState          = (this.barState === 'inactive') ? 'active' : 'inactive';
    this.curtainState      = (this.curtainState === 'inactive') ? 'active' : 'inactive';
  }

}
