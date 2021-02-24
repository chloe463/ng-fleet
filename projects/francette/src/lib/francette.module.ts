import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrButtonModule } from './button/button.module';
import { FrChipModule } from './chip/chip.module';
import { FrDataTableModule } from './data-table/data-table.module';
import { FrDialogModule } from './dialog/dialog.module';
import { FrFormsModule } from './forms/forms.module';
import { FrKpiTableModule } from './kpi-table/kpi-table.module';
import { FrNavbarModule } from './navbar';
import { FrNotificationModule } from './notification/notification.module';
import { FrProgressModule } from './progress/progress.module';
import { FrRippleModule } from './ripple/ripple.module';
import { FrSideNavModule } from './side-nav';
import { FrTabsModule } from './tabs/tabs.module';
import { FrToasterModule } from './toaster/toaster.module';
import { FrTooltipModule } from './tooltip/tooltip.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,

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
    FrToasterModule,
    FrTooltipModule
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
    FrToasterModule,
    FrTooltipModule
  ]
})
export class FrancetteModule { }
