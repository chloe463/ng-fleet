import {
  Directive,
  OnInit,
  Input
} from '@angular/core';

@Directive({
  selector: 'fr-navbar-item'
})
export class NavbarItemComponent implements OnInit {

  @Input() title: string;
  @Input() link: string;

  constructor() { }

  ngOnInit() {
  }

}
