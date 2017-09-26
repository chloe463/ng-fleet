import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FrSideNavModule } from '../side-nav/side-nav.module';

import { FrNavbarComponent } from './navbar/navbar.component';
import { FrNavbarItemDirective } from './navbar-item/navbar-item.component';
import { FrNavbarLogoDirective } from './navbar-logo/navbar-logo.component';
import { FrNavbarMenuDirective } from './navbar-menu/navbar-menu.component';

@NgModule({
  declarations: [
    FrNavbarComponent,
    FrNavbarItemDirective,
    FrNavbarLogoDirective,
    FrNavbarMenuDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FrSideNavModule
  ],
  exports: [
    FrNavbarComponent,
    FrNavbarItemDirective,
    FrNavbarLogoDirective,
    FrNavbarMenuDirective
  ]
})
export class FrNavbarModule { }
