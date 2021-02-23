import {
  Component,
  Input
} from '@angular/core';
import { IFrNavbarNode } from '../navbar/navbar.model';


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
    return this.node.url || "";
  }

  get children(): Array<IFrNavbarNode> {
    return this.node.children || [];
  }
}
