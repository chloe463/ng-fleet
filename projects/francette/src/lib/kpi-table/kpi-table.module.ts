import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrKpiTableComponent } from './kpi-table.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ FrKpiTableComponent ],
  exports: [ FrKpiTableComponent ]
})
export class FrKpiTableModule { }
