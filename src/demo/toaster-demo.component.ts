import { Component } from '@angular/core';

import { FrToasterService } from './../app/toaster/toaster.service';

@Component({
  selector: 'toaster-demo',
  template: `
  <h1>Toaster Demo</h1>
  <button class="fr-btn fr-btn--primary" frRipple (click)="toggleToaster()">toggle toaster</button>
  <button class="fr-btn fr-btn--primary" frRipple (click)="toggleToasterWithService()">toggle toaster with service</button>
  <fr-toaster [(show)]="toastShow" [actionKey]="actionKey" (action)="toasterAction($event)">
    Toaster Content
  </fr-toaster>
  <fr-toaster-entry></fr-toaster-entry>
  `,
  providers: [ FrToasterService ]
})
export class ToasterDemoComponent {
  public toastShow = false;
  public actionKey = 'UNDO';

  constructor(public toasterService: FrToasterService) {}

  public toggleToaster(): void {
    this.toastShow = !this.toastShow;
  }

  public toasterAction(event): void {
    console.log(event);
  }

  public toggleToasterWithService(): void {
    this.toasterService.open<any>('test', 'undo', 2000).subscribe(
      (v) => {
        console.log(v);
      },
      (reason) => {},
      () => {
        console.log('onComplete');
      }
    );
  }
}
