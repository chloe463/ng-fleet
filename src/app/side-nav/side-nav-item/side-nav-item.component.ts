import { Directive, OnInit, Input } from '@angular/core';

@Directive({
  selector: 'fr-side-nav-item'
})
export class FrSideNavItemDirective {

  @Input() label: string;
  @Input() link: string;

}
