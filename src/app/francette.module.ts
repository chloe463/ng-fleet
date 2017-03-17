import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FrSelectComponent } from './forms/select/select.component';
import { FrOptionComponent } from './forms/select/option.component';
import { FrTabsComponent } from './tabs/tabs.component';
import { FrTabComponent } from './tabs/tab.component';
import { FrKpiTableComponent } from './kpi-table/kpi-table.component';
import { FrRadioGroupComponent } from './forms/radio/radio-group.component';
import { FrRadioComponent } from './forms/radio/radio.component';
import { FrCheckboxComponent } from './forms/checkbox/checkbox.component';
import { FrDatePickerComponent } from './forms/date-picker/date-picker.component';
import { FrTimePickerComponent } from './forms/time-picker/time-picker.component';
import { FrNavbarComponent } from './navbar/navbar.component';
import { FrNavbarItemComponent } from './navbar/navbar-item.component';
import { FrNavbarLogoComponent } from './navbar/navbar-logo.component';
import { FrInputTextComponent } from './forms/input-text/input-text.component';

import { FrRippleDirective } from './ripple/ripple.directive';
import { FrChipComponent } from './chip/chip.component';

@NgModule({
  declarations: [
    FrSelectComponent,
    FrOptionComponent,
    FrTabsComponent,
    FrTabComponent,
    FrKpiTableComponent,
    FrRadioComponent,
    FrRadioGroupComponent,
    FrCheckboxComponent,
    FrDatePickerComponent,
    FrTimePickerComponent,
    FrNavbarComponent,
    FrNavbarItemComponent,
    FrNavbarLogoComponent,
    FrRippleDirective,
    FrChipComponent,
    FrInputTextComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    FrSelectComponent,
    FrOptionComponent,
    FrTabsComponent,
    FrTabComponent,
    FrKpiTableComponent,
    FrRadioComponent,
    FrRadioGroupComponent,
    FrCheckboxComponent,
    FrDatePickerComponent,
    FrTimePickerComponent,
    FrNavbarComponent,
    FrNavbarItemComponent,
    FrNavbarLogoComponent,
    FrRippleDirective,
    FrChipComponent,
    FrInputTextComponent
  ]
})
export class FrancetteModule { }
