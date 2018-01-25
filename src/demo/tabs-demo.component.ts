import { Component } from '@angular/core';

/* tslint:disable component-selector */
@Component({
  selector: 'tabs-demo',
  template: `
    <fr-tabs [(selectedIndex)]="selectedIndex">
      <fr-tab title="tab1">
        <p>Tab1 content</p>
      </fr-tab>
      <fr-tab title="tab2">
        <p>Tab2 content</p>
      </fr-tab>
      <fr-tab title="tab3">
        <p>Tab3 content</p>
      </fr-tab>
    </fr-tabs>
  `
})
export class TabsDemoComponent {
  selectedIndex = 0;
}
