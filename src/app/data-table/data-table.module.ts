import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FrFormsModule } from '../forms/forms.module';
import { FrRippleModule } from '../ripple/ripple.module';

import { FrDataTableComponent, FrDataTableStripeDirective } from './data-table/data-table.component';
import { FrDataTableColumnsComponent } from './data-table-columns/data-table-columns.component';
import { FrDataTableFooterComponent } from './data-table-footer/data-table-footer.component';
import { FrDataTableHeaderComponent } from './data-table-header/data-table-header.component';
import { FrDataTableRowsComponent } from './data-table-rows/data-table-rows.component';

@NgModule({
  declarations: [
    FrDataTableComponent,
    FrDataTableStripeDirective,
    FrDataTableHeaderComponent,
    FrDataTableColumnsComponent,
    FrDataTableRowsComponent,
    FrDataTableFooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FrFormsModule,
    FrRippleModule
  ],
  exports: [
    FrDataTableComponent,
    FrDataTableStripeDirective,
    FrDataTableHeaderComponent,
    FrDataTableColumnsComponent,
    FrDataTableRowsComponent,
    FrDataTableFooterComponent
  ]
})
export class FrDataTableModule { }
