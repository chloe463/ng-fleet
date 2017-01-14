import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'fr-kpi-table',
    templateUrl: './kpi-table.component.html',
    styleUrls: ['./kpi-table.component.scss']
})
export class KpiTableComponent implements OnInit {
    @Input() data;

    constructor() {
    }

    ngOnInit() {
    }

    public isSunday(date) {
        const d = this.int2DateObj(date);
        return d.getDay() === 0;
    }

    public isSaturday(date) {
        const d = this.int2DateObj(date);
        return d.getDay() === 6;
    }

    private int2DateObj(objectDate): Date {
        if (!objectDate.toString().match(/[0-9]{8}/)) {
            throw 'objectDate MUST be [0-9]{8}';
        }
        let year  = objectDate.toString().substr(0, 4),
            month = objectDate.toString().substr(4, 2),
            date  = objectDate.toString().substr(6, 2);
        return new Date(year, parseInt(month)-1, date);
    }

    public objectDate2MonthDate(objectDate): string {
        if (!objectDate.toString().match(/[0-9]{8}/)) {
            throw 'objectDate MUST be [0-9]{8}';
        }
        let month = objectDate.toString().substr(4, 2),
            date  = objectDate.toString().substr(6, 2);
        return month + '/' + date;
    }
}
