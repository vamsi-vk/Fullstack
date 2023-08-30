import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ComponentComponent } from './component/component.component';
import { MenubarComponent } from './component/menubar/menubar.component';
import { DatatableComponent } from './datatable/datatable.component';
import { MasterService } from './service/master.service';
import { RegisterComponent } from './component/register/register.component';
import { AuthGaurd } from './share/auth.guard';
import { AuthCanLoadGuard } from './share/auth-canload.guard';
import { ForgetpasswordComponent } from './component/forgetpassword/forgetpassword.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'admin', component: ComponentComponent, canActivate: [AuthGaurd] },
  { path: 'login', component: LoginComponent, canActivate: [AuthCanLoadGuard] },
  { path: 'registration', component: RegisterComponent },
  { path: 'forgot-password', component: ForgetpasswordComponent },

  // {path:'**', component:NotfoundpageComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
