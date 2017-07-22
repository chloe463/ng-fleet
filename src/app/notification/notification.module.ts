import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrNotificationService, FrNotificationContext } from './notification.service';
import {
  FrNotificationEntryComponent,
  FrNotificationInnerDirective,
  FrNotificationContentComponent
} from './notification-entry.component';

@NgModule({
  declarations: [
    FrNotificationEntryComponent,
    FrNotificationInnerDirective,
    FrNotificationContentComponent
  ],
  imports: [ CommonModule ],
  exports: [
    FrNotificationEntryComponent,
  ],
  entryComponents: [ FrNotificationContentComponent ],
  providers: [ FrNotificationService ]
})
export class FrNotificationModule { }
