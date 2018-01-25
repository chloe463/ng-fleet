import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { FrToasterModule } from './toaster/toaster.module';
import { FrNotificationModule } from './notification/notification.module';

import { FrChipComponent } from './chip/chip.component';
import { FrKpiTableComponent } from './kpi-table/kpi-table.component';
import { FrDialogModule } from './dialog/dialog.module';

@NgModule({
  declarations: [
    FrChipComponent,
    FrKpiTableComponent
  ],
  imports: [
    BrowserAnimationsModule,
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
    FrDialogModule,
    FrToasterModule,
    FrNotificationModule
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
    FrDialogModule,
    FrToasterModule,
    FrNotificationModule
  ]
})
export class FrancetteModule { }
