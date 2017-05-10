import { Component } from '@angular/core';

@Component({
  selector: 'develop-area',
  template: `
    <fr-switch [(ngModel)]="swtichValue" [labels]="labels"></fr-switch>
  `
})
export class DevelopAreaComponent {
  public swtichValue = false;
  public labels = { on: 'On', off: 'Off' };

  constructor() {
    setTimeout(() => {
      this.swtichValue = true;
    }, 1000);
  }
}
