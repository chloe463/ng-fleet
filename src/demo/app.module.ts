import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DataTableDemoComponent } from './data-table-demo.component';
import { ChipsDemoComponent } from './chips-demo.component';
import { FormsDemoComponent } from './forms-demo.component';
import { ButtonsDemoComponent } from './buttons-demo.component';
import { TabsDemoComponent } from './tabs-demo.component';
import { KpiTableDemoComponent } from './kpi-table-demo.component';
import { DialogDemoComponent, DialogDummyComponent, PopupDummyComponent } from './dialog-demo.component';
import { ToasterDemoComponent } from './toaster-demo.component';
import { ProgressDemoComponent } from './progress-demo.component';
import { DevelopAreaComponent } from './develop-area.component';
import { TooltipDemoComponent } from './tooltip-demo.component';

import { FrancetteModule } from '../app/francette.module';

const routeConfig: Routes = [
  // { path: '', component: DevelopAreaComponent },
  // { path: 'develop', component: DevelopAreaComponent },
  { path: '', component: FormsDemoComponent, pathMatch: 'full' },
  { path: 'develop', component: FormsDemoComponent },
  { path: 'data-table', component: DataTableDemoComponent },
  { path: 'dialog', component: DialogDemoComponent },
  { path: 'chips', component: ChipsDemoComponent },
  { path: 'forms', component: FormsDemoComponent },
  { path: 'buttons', component: ButtonsDemoComponent },
  { path: 'progress', component: ProgressDemoComponent },
  { path: 'tabs', component: TabsDemoComponent },
  { path: 'toaster', component: ToasterDemoComponent },
  { path: 'tooltip', component: TooltipDemoComponent },
  { path: 'kpi-table', component: KpiTableDemoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    DataTableDemoComponent,
    ChipsDemoComponent,
    FormsDemoComponent,
    ButtonsDemoComponent,
    TabsDemoComponent,
    KpiTableDemoComponent,
    DevelopAreaComponent,
    DialogDemoComponent,
    ToasterDemoComponent,
    ProgressDemoComponent,
    DialogDummyComponent,
    PopupDummyComponent,
    TooltipDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routeConfig),
    FrancetteModule
  ],
  exports: [],
  providers: [],
  entryComponents: [ DialogDummyComponent, PopupDummyComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
