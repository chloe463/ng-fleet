import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrSpinnerComponent } from './spinner/spinner.component';
import { FrBarComponent } from './bar/bar.component';

@NgModule({
  declarations: [
    FrSpinnerComponent,
    FrBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FrSpinnerComponent,
    FrBarComponent
  ]
})
export class FrProgressModule { }
