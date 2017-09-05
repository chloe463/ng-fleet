import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'fr-navbar-menu'
})
export class FrNavbarMenuDirective {

  @Input() link: string;
  @Input() title: string;

}
