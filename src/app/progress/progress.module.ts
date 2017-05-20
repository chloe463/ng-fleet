import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrSpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    FrSpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FrSpinnerComponent
  ]
})
export class FrProgressModule { }
