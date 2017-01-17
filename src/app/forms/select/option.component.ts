import {
    Directive,
    OnInit,
    Input
} from '@angular/core';

@Directive({
    selector: 'fr-option'
})
export class OptionComponent implements OnInit {

    @Input() value;
    @Input() label;

    constructor() { }

    ngOnInit() {
    }

}
