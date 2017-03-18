import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'fr-navbar-logo',
  template: ``
})
export class FrNavbarLogoComponent implements OnInit {

  @Input() link: string;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
