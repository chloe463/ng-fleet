import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'fr-radio',
  templateUrl: './radio.component.html'
})
export class FrRadioComponent implements OnInit {

  @Input() value: string;
  @Input() label: string;

  constructor() {
  }

  ngOnInit() {
  }
}