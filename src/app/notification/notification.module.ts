import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FrNotificationService,
  FrNotificationContext,
  FrNotificationEntryComponent,
  FrNotificationInnerDirective,
  FrNotificationContentComponent
} from './notification.service';

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
