import {
  Directive,
  Input,
  ContentChildren,
  QueryList
} from '@angular/core';
import { FrSideNavItemDirective } from '../side-nav-item/side-nav-item.component';
import { IFrSideNavNodeGroup } from '../../navbar/navbar/navbar.model';

@Directive({
  selector: 'fr-side-nav-item-group'
})
export class FrSideNavItemGroupDirective {

  @Input() group: IFrSideNavNodeGroup;

  @ContentChildren(FrSideNavItemDirective) items: QueryList<FrSideNavItemDirective>;

  get title(): string {
    return this.group.title;
  }

  get collapsible(): boolean {
    return this.group.collapsible;
  }
}
