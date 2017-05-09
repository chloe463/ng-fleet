import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DataTableDemoComponent } from './data-table-demo.component';
import { ChipsDemoComponent } from './chips-demo.component';
import { FormsDemoComponent } from './forms-demo.component';

import { FrancetteModule } from '../app/francette.module';

const routeConfig: Routes = [
  { path: 'data-table', component: DataTableDemoComponent },
  { path: 'chips', component: ChipsDemoComponent },
  { path: 'forms', component: FormsDemoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DataTableDemoComponent,
    ChipsDemoComponent,
    FormsDemoComponent
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
