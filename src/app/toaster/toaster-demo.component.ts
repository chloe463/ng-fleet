import { Component } from '@angular/core';
import { FrNotificationParam, FrNotificationService, FrNotificationType, FrToasterParam, FrToasterService } from 'francette';

/* tslint:disable component-selector */
@Component({
  selector: 'toaster-demo',
  styles: [`
  .level-selector-wrapper {
    display: flex;
    align-items: center;
  }
  .level-selector {
    display: block;
    width: 360px;
    margin: 5px;
  }
  `],
  templateUrl: './toaster-demo.component.html',
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
    this.toasterService.open(toasterParam).subscribe(
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
    };
    this.notificationService.open(notificationParam).subscribe(
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
    };
    this.notificationService.open(notificationParam).subscribe(
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
