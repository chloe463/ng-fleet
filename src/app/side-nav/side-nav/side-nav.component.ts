import {
  Component,
  OnInit,
  AfterContentInit,
  Input,
  ContentChildren,
  QueryList,
  HostListener
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { FrSideNavItemGroupComponent } from '../side-nav-item-group/side-nav-item-group.component';
import { FrSideNavItemComponent } from '../side-nav-item/side-nav-item.component';
import { IFrSideNavNodeGroup } from '../../navbar/navbar/navbar.model';

@Component({
  selector: 'fr-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('navState', [
      state('inactive', style({
        transform: 'translate3d(-100%,0,0)',
        'box-shadow': 'none'
      })),
      state('active', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('inactive => active', [
        animate('500ms cubic-bezier(0.35, 0.25, 0, 1)')
      ]),
      transition('active => inactive', [
        animate('350ms 350ms cubic-bezier(0.35, 0.25, 0, 1)')
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
      transition('inactive => active', [
        animate('250ms cubic-bezier(0.35, 0.25, 0, 1)')
      ]),
      transition('active => inactive', [
        animate('250ms 200ms cubic-bezier(0.35, 0.25, 0, 1)')
      ])
    ]),
    trigger('menuState', [
      state('close', style({
        transform: 'scaleY(0)',
        'transform-origin': '0 0',
        height: 0
      })),
      state('open', style({
        transform: 'scaleY(1)',
        'transform-origin': '0 0'
      })),
      transition('* => *', [
        animate('250ms cubic-bezier(0.35, 0.25, 0, 1)')
      ])
    ])
  ]
})
export class FrSideNavComponent implements AfterContentInit {

  @ContentChildren(FrSideNavItemGroupComponent) itemGroups: QueryList<FrSideNavItemGroupComponent>;

  public navState      = 'inactive';
  public backdropState = 'inactive';
  public menuState: Array<string> = [];

  public sideBarVisibility = false;

  ngAfterContentInit() {
    this.menuState.length = this.itemGroups.length;
    this.itemGroups.forEach((itemGroup: FrSideNavItemGroupComponent, index: number) => {
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
