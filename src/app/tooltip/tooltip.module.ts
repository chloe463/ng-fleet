import { NgModule } from '@angular/core';

import {
  FrTooltipDirective
} from './tooltip.directive';

@NgModule({
  declarations: [
    FrTooltipDirective
  ],
  exports: [
    FrTooltipDirective
  ]
})
export class FrTooltipModule {}
