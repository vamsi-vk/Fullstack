import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ComponentComponent } from './component/component.component';
import { MenubarComponent } from './component/menubar/menubar.component';
import { DatatableComponent } from './datatable/datatable.component';
import { MasterService } from './service/master.service';
import { RegisterComponent } from './component/register/register.component';
const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'admin',component: ComponentComponent},
  {path: 'login', component: LoginComponent},
  {path :'registration', component : RegisterComponent}

  // {path:'**', component:NotfoundpageComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
