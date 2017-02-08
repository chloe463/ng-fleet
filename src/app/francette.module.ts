import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SelectComponent } from './forms/select/select.component';
import { OptionComponent } from './forms/select/option.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';
import { KpiTableComponent } from './kpi-table/kpi-table.component';
import { RadioGroupComponent } from './forms/radio/radio-group.component';
import { RadioComponent } from './forms/radio/radio.component';
import { CheckboxComponent } from './forms/checkbox/checkbox.component';
import { CalendarComponent } from './forms/calendar/calendar.component';
import { TimePickerComponent } from './forms/time-picker/time-picker.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarItemComponent } from './navbar/navbar-item.component';
import { NavbarLogoComponent } from './navbar/navbar-logo.component';

@NgModule({
  declarations: [
    SelectComponent,
    OptionComponent,
    TabsComponent,
    TabComponent,
    KpiTableComponent,
    RadioComponent,
    RadioGroupComponent,
    CheckboxComponent,
    CalendarComponent,
    TimePickerComponent,
    NavbarComponent,
    NavbarItemComponent,
    NavbarLogoComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    SelectComponent,
    OptionComponent,
    TabsComponent,
    TabComponent,
    KpiTableComponent,
    RadioComponent,
    RadioGroupComponent,
    CheckboxComponent,
    CalendarComponent,
    TimePickerComponent,
    NavbarComponent,
    NavbarItemComponent,
    NavbarLogoComponent
  ]
})
export class FrancetteModule { }
