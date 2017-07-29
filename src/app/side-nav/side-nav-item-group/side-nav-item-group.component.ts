import {
  Component,
  OnInit,
  Input,
  ContentChildren,
  QueryList
} from '@angular/core';
import { FrSideNavItemComponent } from '../side-nav-item/side-nav-item.component';

@Component({
  selector: 'fr-side-nav-item-group',
  template: ''
})
export class FrSideNavItemGroupComponent implements OnInit {

  @Input() title: string;
  @Input() collapsible: boolean = false;

  @ContentChildren(FrSideNavItemComponent) items: QueryList<FrSideNavItemComponent>;

  constructor() { }

  ngOnInit() {
  }

}
