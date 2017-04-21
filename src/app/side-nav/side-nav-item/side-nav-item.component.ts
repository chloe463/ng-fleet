import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'fr-side-nav-item',
  template: ''
})
export class FrSideNavItemComponent implements OnInit {

  @Input() label: string;
  @Input() link: string;

  constructor() { }

  ngOnInit() {
  }

}
