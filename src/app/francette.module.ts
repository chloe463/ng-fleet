// Angular modules
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Francette modules
import { FrButtonModule } from './button/button.module';
import { FrChipModule } from './chip/chip.module';
import { FrDataTableModule } from './data-table/data-table.module';
import { FrDialogModule } from './dialog/dialog.module';
import { FrFormsModule } from './forms/forms.module';
import { FrKpiTableModule } from './kpi-table/kpi-table.module';
import { FrNavbarModule } from './navbar/navbar.module';
import { FrNotificationModule } from './notification/notification.module';
import { FrProgressModule } from './progress/progress.module';
import { FrRippleModule } from './ripple/ripple.module';
import { FrSideNavModule } from './side-nav/side-nav.module';
import { FrTabsModule } from './tabs/tabs.module';
import { FrToasterModule } from './toaster/toaster.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    RouterModule,

    FrButtonModule,
    FrChipModule,
    FrDataTableModule,
    FrDialogModule,
    FrFormsModule,
    FrKpiTableModule,
    FrNavbarModule,
    FrNotificationModule,
    FrProgressModule,
    FrRippleModule,
    FrSideNavModule,
    FrTabsModule,
    FrToasterModule
  ],
  exports: [
    FrButtonModule,
    FrChipModule,
    FrDataTableModule,
    FrDialogModule,
    FrFormsModule,
    FrKpiTableModule,
    FrNavbarModule,
    FrNotificationModule,
    FrProgressModule,
    FrRippleModule,
    FrSideNavModule,
    FrTabsModule,
    FrToasterModule
  ]
})
export class FrancetteModule { }
