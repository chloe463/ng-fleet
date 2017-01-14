import {
    Component,
    OnInit,
    ContentChildren,
    QueryList,
    Input
} from '@angular/core';
import {TabComponent} from './tab.component';

@Component({
    selector: 'fr-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

    @ContentChildren(TabComponent) _tabs: QueryList<TabComponent>;

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this._tabs.forEach((tab: TabComponent, index: number) => {
            tab.setSelected(false);
        });
        this._tabs.first.setSelected(true);
    }

    select(tab: TabComponent) {
        this._tabs.forEach((tab: TabComponent, index: number) => {
            tab.setSelected(false);
        });
        tab.setSelected(true);
        return false;
    }

    isSelectedIndex(tab: TabComponent) {
        return tab.getSelected();
    }
}
