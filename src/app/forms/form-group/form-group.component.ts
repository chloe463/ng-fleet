import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'fr-form-group',
  templateUrl: './form-group.component.html'
})
export class FrFormGroupComponent implements OnInit {

  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
