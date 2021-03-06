import {
  Component,

  ContentChildren, Input,

  QueryList
} from '@angular/core';
import { IFrSideNavNodeGroup } from '../../navbar/navbar/navbar.model';
import { FrSideNavItemComponent } from '../side-nav-item/side-nav-item.component';

@Component({
  selector: 'fr-side-nav-item-group',
  template: ''
})
export class FrSideNavItemGroupComponent {

  @Input() group: IFrSideNavNodeGroup;

  @ContentChildren(FrSideNavItemComponent) items: QueryList<FrSideNavItemComponent>;

  get title(): string {
    return this.group.title;
  }

  get collapsible(): boolean {
    return Boolean(this.group.collapsible);
  }
}
