import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'fr-option',
  template: ``
})
export class FrOptionComponent implements OnInit {

  @Input() value: string;
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
