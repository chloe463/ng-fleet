import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  FrToasterService,
  FrToasterContext,
  FrToasterInnerDirective,
  FrToasterEntryComponent,
  FrToasterContentComponent
} from './toaster.service';

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
