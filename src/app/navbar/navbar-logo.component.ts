import {
  Directive,
  OnInit,
  Input
} from '@angular/core';

@Directive({
  selector: 'fr-navbar-logo'
})
export class NavbarLogoComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
