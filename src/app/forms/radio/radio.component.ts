import {
    Component,
    OnInit,
    Input
} from '@angular/core';

@Component({
  selector: 'fr-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

    @Input() value;
    @Input() label;

    constructor() {
    }

    ngOnInit() {
    }
}
