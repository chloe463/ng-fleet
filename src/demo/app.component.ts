import { Component } from '@angular/core';

@Component({
  selector: 'fr-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Francette';
  selectedIndex = 0;
  data = {
    dateList: [
      20170101, 20170102, 20170103, 20170104, 20170105, 20170106, 20170107
    ],
    kpi: [
      { name: 'row0', values: [1, 2, 3, 4, 5, 6, 7] },
      { name: 'row1', values: [2, 3, 4, 5, 6, 7, 8] },
      { name: 'row2', values: [3, 4, 5, 6, 7, 8, 9] },
    ]
  };

}

