import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrRippleDirective } from './ripple.directive';

@NgModule({
  declarations: [ FrRippleDirective ],
  imports: [ CommonModule ],
  exports: [ FrRippleDirective ]
})
export class FrRippleModule { }
