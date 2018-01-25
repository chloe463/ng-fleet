import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FrSideNavComponent } from './side-nav/side-nav.component';
import { FrSideNavItemGroupComponent } from './side-nav-item-group/side-nav-item-group.component';
import { FrSideNavItemComponent } from './side-nav-item/side-nav-item.component';

@NgModule({
  declarations: [
    FrSideNavComponent,
    FrSideNavItemGroupComponent,
    FrSideNavItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FrSideNavComponent,
    FrSideNavItemGroupComponent,
    FrSideNavItemComponent
  ]
})
export class FrSideNavModule { }
