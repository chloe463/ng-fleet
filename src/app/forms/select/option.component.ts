import {
    Component,
    OnInit,
    OnDestroy,
    Input
} from '@angular/core';

@Component({
    selector: 'fr-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

    @Input() value;
    @Input() label;

    constructor() { }

    ngOnInit() {
    }

}
