import { Component } from '@angular/core';

import { FrToasterService } from './../app/toaster/toaster.service';
import { FrToasterParam } from './../app/toaster/toaster.types';
import { FrNotificationService } from './../app/notification/notification.service';
import { FrNotificationParam, FrNotificationType } from './../app/notification/notification.types';

/* tslint:disable component-selector */
@Component({
  selector: 'toaster-demo',
  styles: [`
  .container {
    display: grid;
    grid-template-columns: 50% 50%;
  }
  .level-selector {
    display: block;
    width: 360px;
    margin: 5px;
  }
  `],
  template: `
  <h1>Toaster and Toaster Demo</h1>
  <div class="container">
    <div class="toaster-demo">
      <button class="fr-btn fr-btn--primary" frRipple (click)="showToaster()">toaster</button>
    </div>
    <div class="notification-demo">
      <fr-select
        class="level-selector"
        [placeholder]="'Notification Level'"
        [browserNative]="false"
        [(ngModel)]="notificationLevel">
        <fr-option *ngFor="let level of levels"
          [value]="level" [label]="level"></fr-option>
      </fr-select>
      <button class="fr-btn fr-btn--primary" (click)="showNotification()">Notification</button>
    </div>
  </div>
  <fr-toaster-entry></fr-toaster-entry>
  <fr-notification-entry></fr-notification-entry>
  `,
  providers: [ FrToasterService, FrNotificationService ]
})
export class ToasterDemoComponent {

  notificationLevel: FrNotificationType = 'default';
  levels = ['default', 'primary', 'info', 'warning', 'danger'];

  constructor(
    public toasterService: FrToasterService,
    public notificationService: FrNotificationService
  ) {}

  public showToaster(): void {
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

  public showNotification(): void {
    const notificationParam: FrNotificationParam = {
      text: 'Hi! I\'m a notification!',
      type: this.notificationLevel,
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
