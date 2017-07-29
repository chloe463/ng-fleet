import {
  Component,
  OnInit,
  AfterContentInit,
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

import { FrSideNavItemGroupDirective } from '../side-nav-item-group/side-nav-item-group.component';
import { FrSideNavItemDirective } from '../side-nav-item/side-nav-item.component';

@Component({
  selector: 'fr-side-nav',
  templateUrl: './side-nav.component.html',
  animations: [
    trigger('navState', [
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
    trigger('backdropState', [
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
    ]),
    trigger('menuState', [
      state('close', style({
        display: 'none',
        opacity: 0
      })),
      state('open', style({
        display: 'block',
        opacity: 1
      })),
      transition('* => *', [
        animate('250ms cubic-bezier(0.35, 0.25, 0, 1)')
      ])
    ])
  ]
})
export class FrSideNavComponent implements AfterContentInit {

  @ContentChildren(FrSideNavItemGroupDirective) itemGroups: QueryList<FrSideNavItemGroupDirective>;

  public navState      = 'inactive';
  public backdropState = 'inactive';
  public menuState: Array<string> = [];

  public sideBarVisibility = false;

  ngAfterContentInit() {
    this.menuState.length = this.itemGroups.length;
    this.itemGroups.forEach((itemGroup: FrSideNavItemGroupDirective, index: number) => {
      this.menuState[index] = itemGroup.collapsible ? 'close' : 'open';
    });
  }

  public toggleVisibility(): void {
    this.sideBarVisibility = !this.sideBarVisibility;
    this.navState          = (this.navState === 'inactive') ? 'active' : 'inactive';
    this.backdropState     = (this.backdropState === 'inactive') ? 'active' : 'inactive';
  }

  public toggleMenu(index: number): void {
    if (!this.itemGroups.toArray()[index].collapsible) {
      return;
    }
    this.menuState[index] = (this.menuState[index] === 'close') ? 'open' : 'close';
  }

}
