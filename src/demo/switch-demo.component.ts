import { Component } from '@angular/core';

@Component({
  selector: 'switch-demo',
  template: `
    <fr-switch [(ngModel)]="swtichValue" [labels]="labels"></fr-switch>
  `
})
export class SwitchDemoComponent {
  public swtichValue = false;
  public labels = { on: 'On', off: 'Off' };

  constructor() {
    setTimeout(() => {
      this.swtichValue = true;
    }, 1000);
  }
}
