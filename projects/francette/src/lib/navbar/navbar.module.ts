import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FrSideNavModule } from '../side-nav';

import { FrNavbarComponent } from './navbar/navbar.component';
import { FrNavbarItemComponent } from './navbar-item/navbar-item.component';
import { FrNavbarLogoComponent } from './navbar-logo/navbar-logo.component';
import { FrNavbarMenuComponent } from './navbar-menu/navbar-menu.component';

import { FrRippleModule } from '../ripple';

@NgModule({
  declarations: [
    FrNavbarComponent,
    FrNavbarItemComponent,
    FrNavbarLogoComponent,
    FrNavbarMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FrSideNavModule,
    FrRippleModule
  ],
  exports: [
    FrNavbarComponent,
    FrNavbarItemComponent,
    FrNavbarLogoComponent,
    FrNavbarMenuComponent
  ]
})
export class FrNavbarModule { }
