import {
  Directive,
  OnInit,
  Input
} from '@angular/core';

@Directive({
  selector: 'fr-option'
})
export class FrOptionComponent implements OnInit {

  @Input() value;
  @Input() label;

  constructor() { }

  ngOnInit() {
  }

}
