import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrDialogService } from './dialog.service';
import { FrDialogEntryComponent, FrDialogInnerDirective } from './dialog-entry.component';

@NgModule({
  declarations: [ FrDialogInnerDirective, FrDialogEntryComponent ],
  imports: [ CommonModule ],
  exports: [ FrDialogEntryComponent ],
  providers: [ FrDialogService ]
})
export class FrDialogModule {}
