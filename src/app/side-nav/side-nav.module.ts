import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FrSideNavComponent } from './side-nav/side-nav.component';
import { FrSideNavItemGroupDirective } from './side-nav-item-group/side-nav-item-group.component';
import { FrSideNavItemDirective } from './side-nav-item/side-nav-item.component';

@NgModule({
  declarations: [
    FrSideNavComponent,
    FrSideNavItemGroupDirective,
    FrSideNavItemDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FrSideNavComponent,
    FrSideNavItemGroupDirective,
    FrSideNavItemDirective
  ]
})
export class FrSideNavModule { }
