import { Component, Input } from '@angular/core';

@Component({
  selector: 'fr-option',
  template: ``
})
export class FrOptionComponent {

  @Input() value: any;
  @Input() label: string;
  @Input() selected = false;

}
