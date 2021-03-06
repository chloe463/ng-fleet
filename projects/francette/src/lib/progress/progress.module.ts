import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrProgressSpinnerComponent } from './spinner/spinner.component';
import { FrProgressBarComponent } from './bar/bar.component';

@NgModule({
  declarations: [
    FrProgressSpinnerComponent,
    FrProgressBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FrProgressSpinnerComponent,
    FrProgressBarComponent
  ]
})
export class FrProgressModule { }
