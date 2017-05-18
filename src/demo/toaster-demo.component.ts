import { Component } from '@angular/core';

@Component({
  selector: 'toaster-demo',
  template: `
  <h1>Toaster Demo</h1>
  <button class="fr-btn fr-btn--primary" frRipple (click)="toggleToaster()">toggle toaster</button>
  <fr-toaster [(show)]="toastShow" [actionKey]="actionKey" (action)="toasterAction($event)">
    Toaster Content
  </fr-toaster>
  `
})
export class ToasterDemoComponent {
  public toastShow = false;
  public actionKey = 'UNDO';

  public toggleToaster(): void {
    this.toastShow = !this.toastShow;
  }

  public toasterAction(event): void {
    console.log(event);
  }
}
