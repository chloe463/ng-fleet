import {
    Component,
    OnInit,
    Input
} from '@angular/core';

@Component({
    selector: 'fr-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

    @Input() title;

    public selected: boolean;

    constructor() { }

    ngOnInit() {
        this.selected = false;
    }

    public getSelected(): boolean {
        return this.selected;
    }

    public setSelected(flag: boolean): void {
        this.selected = flag;
    }

    public isSelected(): boolean {
        return this.selected;
    }
}
