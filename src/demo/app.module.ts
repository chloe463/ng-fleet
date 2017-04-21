import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {
  FrNavSample1Component,
  FrNavSample2Component,
  FrNavSample3Component,
} from './app.component';

import { FrancetteModule } from '../app/francette.module';

const routeConfig: Routes = [
  { path: 'nav1', component: FrNavSample1Component },
  { path: 'nav2', component: FrNavSample2Component },
  { path: 'nav3', component: FrNavSample3Component },
  { path: 'menu1-1', component: FrNavSample1Component },
];

@NgModule({
  declarations: [
    AppComponent,
    FrNavSample1Component,
    FrNavSample2Component,
    FrNavSample3Component
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
