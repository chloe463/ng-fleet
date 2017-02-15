import {
  Directive,
  OnInit,
  Input
} from '@angular/core';

@Directive({
  selector: 'fr-navbar-logo'
})
export class FrNavbarLogoComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
