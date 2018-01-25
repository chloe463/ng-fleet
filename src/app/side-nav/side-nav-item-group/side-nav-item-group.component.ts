import {
  Component,
  Input,
  ContentChildren,
  QueryList
} from '@angular/core';
import { FrSideNavItemComponent } from '../side-nav-item/side-nav-item.component';
import { IFrSideNavNodeGroup } from '../../navbar/navbar/navbar.model';

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
    return this.group.collapsible;
  }
}
