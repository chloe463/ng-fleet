import {
  Directive,
  Input,
  ContentChildren,
  QueryList
} from '@angular/core';

import { IFrNavbarNode } from '../navbar/navbar.model';
import { FrNavbarMenuDirective } from '../navbar-menu/navbar-menu.component';

@Directive({
  selector: 'fr-navbar-item'
})
export class FrNavbarItemDirective {
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
