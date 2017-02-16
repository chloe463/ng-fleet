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
import { FrCalendarComponent } from './forms/calendar/calendar.component';
import { FrTimePickerComponent } from './forms/time-picker/time-picker.component';
import { FrNavbarComponent } from './navbar/navbar.component';
import { FrNavbarItemComponent } from './navbar/navbar-item.component';
import { FrNavbarLogoComponent } from './navbar/navbar-logo.component';

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
    FrCalendarComponent,
    FrTimePickerComponent,
    FrNavbarComponent,
    FrNavbarItemComponent,
    FrNavbarLogoComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forRoot([])
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
    FrCalendarComponent,
    FrTimePickerComponent,
    FrNavbarComponent,
    FrNavbarItemComponent,
    FrNavbarLogoComponent
  ]
})
export class FrancetteModule { }
