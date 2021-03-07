import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FrProgressBarComponent } from './bar/bar.component';
import { FrProgressRippleComponent } from './ripple/ripple.component';
import { FrProgressSpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    FrProgressBarComponent,
    FrProgressRippleComponent,
    FrProgressSpinnerComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FrProgressBarComponent,
    FrProgressRippleComponent,
    FrProgressSpinnerComponent,
  ]
})
export class FrProgressModule { }
