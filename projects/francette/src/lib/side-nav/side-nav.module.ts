import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrRippleModule } from '../ripple';
import { FrSideNavItemGroupComponent } from './side-nav-item-group/side-nav-item-group.component';
import { FrSideNavItemComponent } from './side-nav-item/side-nav-item.component';
import { FrSideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  declarations: [
    FrSideNavComponent,
    FrSideNavItemGroupComponent,
    FrSideNavItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FrRippleModule
  ],
  exports: [
    FrSideNavComponent,
    FrSideNavItemGroupComponent,
    FrSideNavItemComponent
  ]
})
export class FrSideNavModule { }
