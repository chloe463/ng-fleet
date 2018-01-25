import { Component } from '@angular/core';

import { FrToasterService } from './../app/toaster/toaster.service';
import { FrToasterParam } from './../app/toaster/toaster.types';
import { FrNotificationService } from './../app/notification/notification.service';
import { FrNotificationParam, FrNotificationType } from './../app/notification/notification.types';

/* tslint:disable component-selector */
@Component({
  selector: 'toaster-demo',
  template: `
  <h1>Toaster Demo</h1>
  <button class="fr-btn fr-btn--primary" frRipple (click)="toggleToaster()">toggle toaster</button>
  <button class="fr-btn fr-btn--primary" frRipple (click)="toggleToasterWithService()">toggle toaster with service</button>
  <hr>
  <button class="fr-btn" frRipple (click)="popupNotification('default')">popup notification</button>
  <button class="fr-btn fr-btn--primary" frRipple (click)="popupNotification('primary')">popup notification</button>
  <button class="fr-btn fr-btn--info" frRipple (click)="popupNotification('info')">popup notification</button>
  <button class="fr-btn fr-btn--warning" frRipple (click)="popupNotification('warning')">popup notification</button>
  <button class="fr-btn fr-btn--danger" frRipple (click)="popupNotification('danger')">popup notification</button>
  <fr-toaster [(show)]="toastShow" [actionKey]="actionKey" (action)="toasterAction($event)">
    Toaster Content
  </fr-toaster>
  <fr-toaster-entry></fr-toaster-entry>
  <fr-notification-entry></fr-notification-entry>
  `,
  providers: [ FrToasterService, FrNotificationService ]
})
export class ToasterDemoComponent {
  public toastShow = false;
  public actionKey = 'UNDO';

  constructor(
    public toasterService: FrToasterService,
    public notificationService: FrNotificationService
  ) {}

  public toggleToaster(): void {
    this.toastShow = !this.toastShow;
  }

  public toasterAction(event): void {
    console.log(event);
  }

  public toggleToasterWithService(): void {
    const toasterParam: FrToasterParam = {
      text: 'test',
      action: 'undo',
      timeout: 2000
    };
    this.toasterService.open<any>(toasterParam).subscribe(
      (v) => {
        console.log(v);
      },
      (reason) => {},
      () => {
        console.log('onComplete');
      }
    );
  }

  public popupNotification(type: FrNotificationType): void {
    const notificationParam: FrNotificationParam = {
      text: 'Hi! I\'m a notification!',
      type: type,
      timeout: 3000,
      extraParams: { message: 'message' }
    };
    this.notificationService.open<any>(notificationParam).subscribe(
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
