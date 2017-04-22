import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrTabsComponent } from './tabs.component';
import { FrTabComponent } from './tab.component';
import { FrRippleModule } from '../ripple/ripple.module';

@NgModule({
  declarations: [
    FrTabComponent,
    FrTabsComponent
  ],
  imports: [
    CommonModule,
    FrRippleModule
  ],
  exports: [
    FrTabComponent,
    FrTabsComponent
  ]
})
export class FrTabsModule { }
