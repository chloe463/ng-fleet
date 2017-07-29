import {
  Directive,
  Input,
  ContentChildren,
  QueryList
} from '@angular/core';
import { FrSideNavItemDirective } from '../side-nav-item/side-nav-item.component';

@Directive({
  selector: 'fr-side-nav-item-group'
})
export class FrSideNavItemGroupDirective {

  @Input() title: string;
  @Input() collapsible: boolean = false;

  @ContentChildren(FrSideNavItemDirective) items: QueryList<FrSideNavItemDirective>;

}
