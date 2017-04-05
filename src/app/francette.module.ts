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
import { FrNavbarMenuComponent } from './navbar/navbar-menu.component';
import { FrInputTextComponent } from './forms/input-text/input-text.component';

import { FrRippleDirective } from './ripple/ripple.directive';
import { FrChipComponent } from './chip/chip.component';
import { FrDataTableComponent } from './data-table/data-table/data-table.component';
import { FrDataTableHeaderComponent } from './data-table/data-table-header/data-table-header.component';
import { FrDataTableFooterComponent } from './data-table/data-table-footer/data-table-footer.component';
import { FrDataTableRowsComponent } from './data-table/data-table-rows/data-table-rows.component';
import { FrDataTableColumnsComponent } from './data-table/data-table-columns/data-table-columns.component';

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
    FrNavbarMenuComponent,
    FrRippleDirective,
    FrChipComponent,
    FrInputTextComponent,
    FrDataTableComponent,
    FrDataTableColumnsComponent,
    FrDataTableHeaderComponent,
    FrDataTableFooterComponent,
    FrDataTableRowsComponent
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
    FrNavbarMenuComponent,
    FrRippleDirective,
    FrChipComponent,
    FrInputTextComponent,
    FrDataTableComponent,
    FrDataTableColumnsComponent,
    FrDataTableHeaderComponent,
    FrDataTableFooterComponent,
    FrDataTableRowsComponent
  ]
})
export class FrancetteModule { }
