import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FrancetteModule } from '../app/francette.module';
import { AppComponent } from './app.component';
import { ButtonsDemoComponent } from './buttons-demo.component';
import { ChipsDemoComponent } from './chips-demo.component';
import { DataTableDemoComponent } from './data-table-demo.component';
import { DevelopAreaComponent } from './develop-area.component';
import { DialogDemoComponent, DialogDummyComponent, PopupDummyComponent } from './dialog-demo.component';
import { FormsDemoComponent } from './forms-demo.component';
import { KpiTableDemoComponent } from './kpi-table-demo.component';
import { ProgressDemoComponent } from './progress-demo.component';
import { TabsDemoComponent } from './tabs-demo.component';
import { ToasterDemoComponent } from './toaster-demo.component';
import { TodoContainerComponent } from './todo-container/todo-container.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TooltipDemoComponent } from './tooltip-demo.component';



const routeConfig: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos', component: TodoContainerComponent },
  // { path: '', component: DevelopAreaComponent },
  // { path: 'develop', component: DevelopAreaComponent },
  // { path: '', component: FormsDemoComponent, pathMatch: 'full' },
  // { path: 'develop', component: FormsDemoComponent },
  // { path: 'data-table', component: DataTableDemoComponent },
  // { path: 'dialog', component: DialogDemoComponent },
  // { path: 'chips', component: ChipsDemoComponent },
  // { path: 'forms', component: FormsDemoComponent },
  // { path: 'buttons', component: ButtonsDemoComponent },
  // { path: 'progress', component: ProgressDemoComponent },
  // { path: 'tabs', component: TabsDemoComponent },
  // { path: 'toaster', component: ToasterDemoComponent },
  // { path: 'tooltip', component: TooltipDemoComponent },
  // { path: 'kpi-table', component: KpiTableDemoComponent },
  // { path: '**', redirectTo: '/todos', pathMatch: 'full' }
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
    TooltipDemoComponent,
    TodoContainerComponent,
    TodoListComponent,
    TodoItemComponent,
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
  entryComponents: [DialogDummyComponent, PopupDummyComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
