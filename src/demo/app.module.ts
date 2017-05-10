import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DataTableDemoComponent } from './data-table-demo.component';
import { ChipsDemoComponent } from './chips-demo.component';
import { FormsDemoComponent } from './forms-demo.component';
import { ButtonsDemoComponent } from './buttons-demo.component';
import { TabsDemoComponent } from './tabs-demo.component';
import { KpiTableDemoComponent } from './kpi-table-demo.component';
import { SwitchDemoComponent } from './switch-demo.component';
import { DevelopAreaComponent } from './develop-area.component';

import { FrancetteModule } from '../app/francette.module';

const routeConfig: Routes = [
  { path: '', component: DevelopAreaComponent },
  { path: 'develop', component: DevelopAreaComponent },
  { path: 'data-table', component: DataTableDemoComponent },
  { path: 'chips', component: ChipsDemoComponent },
  { path: 'forms', component: FormsDemoComponent },
  { path: 'buttons', component: ButtonsDemoComponent },
  { path: 'switch', component: SwitchDemoComponent },
  { path: 'tabs', component: TabsDemoComponent },
  { path: 'kpi-table', component: KpiTableDemoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DataTableDemoComponent,
    ChipsDemoComponent,
    FormsDemoComponent,
    ButtonsDemoComponent,
    SwitchDemoComponent,
    TabsDemoComponent,
    KpiTableDemoComponent,
    DevelopAreaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routeConfig),
    FrancetteModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
