import {
  Component,
  Input,
  ContentChildren,
  QueryList
} from '@angular/core';

import { IFrNavbarNode } from '../navbar/navbar.model';
import { FrNavbarMenuComponent } from '../navbar-menu/navbar-menu.component';

@Component({
  selector: 'fr-navbar-item',
  template: ''
})
export class FrNavbarItemComponent {
  @Input() node: IFrNavbarNode;

  get title(): string {
    return this.node.title;
  }

  get url(): string {
    return this.node.url;
  }

  get children(): Array<IFrNavbarNode> {
    return this.node.children;
  }
}
