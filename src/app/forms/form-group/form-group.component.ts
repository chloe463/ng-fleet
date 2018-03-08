import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'fr-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FrFormGroupComponent implements OnInit {

  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
