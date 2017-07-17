import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FrButtonModule } from './button/button.module';
import { FrFormsModule } from './forms/forms.module';
import { FrDataTableModule } from './data-table/data-table.module';
import { FrNavbarModule } from './navbar/navbar.module';
import { FrTabsModule } from './tabs/tabs.module';
import { FrRippleModule } from './ripple/ripple.module';
import { FrSideNavModule } from './side-nav/side-nav.module';
import { FrProgressModule } from './progress/progress.module';

import { FrChipComponent } from './chip/chip.component';
import { FrKpiTableComponent } from './kpi-table/kpi-table.component';
import { FrSwitchComponent } from './switch/switch.component';
import { FrDialogComponent } from './dialog/dialog.component';
import { FrToasterComponent } from './toaster/toaster.component';
import { FrDialogModule } from './dialog/dialog.module';

@NgModule({
  declarations: [
    FrChipComponent,
    FrKpiTableComponent,
    FrSwitchComponent,
    FrDialogComponent,
    FrToasterComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    FrButtonModule,
    FrDataTableModule,
    FrFormsModule,
    FrNavbarModule,
    FrTabsModule,
    FrRippleModule,
    FrSideNavModule,
    FrProgressModule,
    FrDialogModule
  ],
  exports: [
    FrChipComponent,
    FrKpiTableComponent,
    FrDataTableModule,
    FrButtonModule,
    FrFormsModule,
    FrNavbarModule,
    FrTabsModule,
    FrRippleModule,
    FrSideNavModule,
    FrProgressModule,
    FrSwitchComponent,
    FrDialogComponent,
    FrToasterComponent,
    FrDialogModule
  ]
})
export class FrancetteModule { }
