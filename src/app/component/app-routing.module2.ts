
import { DatatableComponent } from '../datatable/datatable.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';

const routes: Routes = [

  {path:'datatable',component:DatatableComponent},
  {path:'**', component:NotfoundpageComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule2 { }
