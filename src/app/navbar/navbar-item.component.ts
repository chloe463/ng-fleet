import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'fr-navbar-item',
  template: ``
})
export class FrNavbarItemComponent implements OnInit {

  @Input() title: string;
  @Input() link: string;

  constructor() { }

  ngOnInit() {
  }

}
