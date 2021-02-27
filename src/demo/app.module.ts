import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FrancetteModule } from 'francette';
import { AppComponent } from './app.component';
import { ButtonsDemoComponent } from './button/buttons-demo.component';
import { ChipsDemoComponent } from './chip/chips-demo.component';
import { DataTableDemoComponent } from './data-table/data-table-demo.component';
import { DevelopAreaComponent } from './develop-area.component';
import { DialogDemoComponent, DialogDummyComponent, PopupDummyComponent } from './dialog/dialog-demo.component';
import { FormsDemoComponent } from './forms/forms-demo.component';
import { ProgressDemoComponent } from './progress/progress-demo.component';
import { TabsDemoComponent } from './tab/tabs-demo.component';
import { ToasterDemoComponent } from './toaster-demo.component';
import { TooltipDemoComponent } from './tooltip-demo.component';

const routeConfig: Routes = [
  { path: '', component: DevelopAreaComponent },
  { path: 'develop', component: DevelopAreaComponent },
  // { path: '', component: FormsDemoComponent, pathMatch: 'full' },
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
    RouterModule.forRoot(routeConfig, { relativeLinkResolution: 'legacy' }),
    FrancetteModule
  ],
  exports: [],
  providers: [],
  entryComponents: [ DialogDummyComponent, PopupDummyComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
