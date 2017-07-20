import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FrToasterService, FrToasterContext } from './toaster.service';
import { FrToasterInnerDirective, FrToasterEntryComponent, FrToasterContentComponent } from './toaster-entry.component';

@NgModule({
  declarations: [
    FrToasterInnerDirective,
    FrToasterEntryComponent,
    FrToasterContentComponent
  ],
  imports: [ CommonModule ],
  exports: [
    FrToasterEntryComponent
  ],
  entryComponents: [ FrToasterContentComponent ],
  providers: [ FrToasterService ]
})
export class FrToasterModule {}
