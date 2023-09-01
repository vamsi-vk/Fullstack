import { AngularFireModule } from '@angular/fire/compat';
import { NgModule } from '@angular/core';


import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgToastService } from 'ng-angular-popup';
import { AppRoutingModule2 } from './component/app-routing.module2';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputComponent } from './input/input.component';
import { MaterialModule } from './material-module';
import { AutocompleteComponent } from './component/autocomplete/autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarComponent } from './component/menubar/menubar.component';
import { HomeComponent } from './component/home/home.component';
import { CardComponent } from './component/card/card.component';
import { TableComponent } from './component/table/table.component';
import { DeletepopupComponent } from './component/deletepopup/deletepopup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormdesignComponent } from './component/formdesign/formdesign.component';
import { PopupComponent } from './component/popup/popup.component';
import { AssociateComponent } from './component/associate/associate.component';
import { UserdetailComponent } from './component/userdetail/userdetail.component';
import { DatatableComponent } from './datatable/datatable.component';
import { EditPopupComponent } from './edit-popup/edit-popup.component';
import { NgToastModule } from 'ng-angular-popup';
import { NotfoundpageComponent } from './component/notfoundpage/notfoundpage.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AdminComponent } from './component/admin/admin.component';
import { ComponentComponent } from './component/component.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ForgetpasswordComponent } from './component/forgetpassword/forgetpassword.component';



@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    AutocompleteComponent,
    MenubarComponent,
    HomeComponent,
    CardComponent,
    TableComponent,
    FormdesignComponent,
    PopupComponent,
    AssociateComponent,
    UserdetailComponent,
    DatatableComponent,
    EditPopupComponent,
    NotfoundpageComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ComponentComponent,
    ForgetpasswordComponent,
    DeletepopupComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    AppRoutingModule2,
    MatCardModule,
    MatFormFieldModule,

    AngularFireModule.initializeApp(
      {
        apiKey: "AIzaSyCs8AfkLQ89-yrib3oTLlhBY1ExYuzg0B4",
        authDomain: "course-project-a0c65.firebaseapp.com",
        projectId: "course-project-a0c65",
        storageBucket: "course-project-a0c65.appspot.com",
        messagingSenderId: "980985850690",
        appId: "1:980985850690:web:81cb320f76f56c4407f6db"
      },),
   

  ],
  providers: [NgToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
