import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FrSideNavModule } from '../side-nav/side-nav.module';

import { FrNavbarComponent } from './navbar.component';
import { FrNavbarItemComponent } from './navbar-item.component';
import { FrNavbarLogoComponent } from './navbar-logo.component';
import { FrNavbarMenuComponent } from './navbar-menu.component';

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
    FrSideNavModule
  ],
  exports: [
    FrNavbarComponent,
    FrNavbarItemComponent,
    FrNavbarLogoComponent,
    FrNavbarMenuComponent
  ]
})
export class FrNavbarModule { }
