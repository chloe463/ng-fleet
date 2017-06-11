import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FrButtonDirective,
  FrPrimaryButtonDirective,
  FrInfoButtonDirective,
  FrWarningButtonDirective,
  FrDangerButtonDirective,
  FrDisabledButtonDirective,
  FrSkeletonButtonDirective,
  FrSkeletonPrimaryButtonDirective,
  FrSkeletonInfoButtonDirective,
  FrSkeletonWarningButtonDirective,
  FrSkeletonDangerButtonDirective,
  FrSkeletonDisabledButtonDirective,
  FrFlatButtonDirective
} from './button.directive';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    FrButtonDirective,
    FrPrimaryButtonDirective,
    FrInfoButtonDirective,
    FrWarningButtonDirective,
    FrDangerButtonDirective,
    FrDisabledButtonDirective,
    FrSkeletonButtonDirective,
    FrSkeletonPrimaryButtonDirective,
    FrSkeletonInfoButtonDirective,
    FrSkeletonWarningButtonDirective,
    FrSkeletonDangerButtonDirective,
    FrSkeletonDisabledButtonDirective,
    FrFlatButtonDirective
  ],
  exports: [
    FrButtonDirective,
    FrPrimaryButtonDirective,
    FrInfoButtonDirective,
    FrWarningButtonDirective,
    FrDangerButtonDirective,
    FrDisabledButtonDirective,
    FrSkeletonButtonDirective,
    FrSkeletonPrimaryButtonDirective,
    FrSkeletonInfoButtonDirective,
    FrSkeletonWarningButtonDirective,
    FrSkeletonDangerButtonDirective,
    FrSkeletonDisabledButtonDirective,
    FrFlatButtonDirective
  ]
})
export class FrButtonModule { }
