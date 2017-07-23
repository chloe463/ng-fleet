# Notification

## OVERVIEW

You can show notification on top right.

## Usage

```typescript
import { Component } from '@angular/core';

import { FrNotificationService, FrNotificationParam, FrNotificationType } from 'francette';

@Component({
  selector: 'notification-sample-component',
  template: `
  <!-- Your application code goes here -->

  <!-- Remember put fr-notification-entry component to show notification -->
  <fr-notification-entry></fr-notification-entry>
  `,
  providers: [ FrNotificationService ]
})
export class NotificationSampleComponent {
  constructor (private _notification: FrNotificationService) {}

  public doSomething(): void {
    const notificationParam: FrNotificationParam = {
      text: "Hi! I'm a notification!",    // Main text to show in notification
      type: 'info',                       // It determines color of the notification (default, primary, info, warning, or danger)
      timeout: 3000                       // Duration to keep showing the notification. (milliseconds)
    };
    this._notification.open<any>(notificationParam).subscribe(
      () => { console.log('onNext'); },
      () => { console.log('onError'); },
      () => { console.log('onComplete'); }
    );
  }
}
```
