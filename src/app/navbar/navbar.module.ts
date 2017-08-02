import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FrSideNavModule } from '../side-nav/side-nav.module';

import { FrNavbarComponent } from './navbar/navbar.component';
import { FrNavbarItemComponent, FrNavbarRightItemComponent } from './navbar-item/navbar-item.component';
import { FrNavbarLogoDirective } from './navbar-logo/navbar-logo.component';
import { FrNavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { FrNavbarMenuItemComponent } from './navbar-menu-item/navbar-menu-item.component';

@NgModule({
  declarations: [
    FrNavbarComponent,
    FrNavbarItemComponent,
    FrNavbarRightItemComponent,
    FrNavbarLogoDirective,
    FrNavbarMenuComponent,
    FrNavbarMenuItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FrSideNavModule
  ],
  exports: [
    FrNavbarComponent,
    FrNavbarItemComponent,
    FrNavbarRightItemComponent,
    FrNavbarLogoDirective,
    FrNavbarMenuComponent,
    FrNavbarMenuItemComponent,
  ]
})
export class FrNavbarModule { }
