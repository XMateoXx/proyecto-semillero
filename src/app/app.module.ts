import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarComponent } from './component/menubar/menubar.component';
import { HomeComponent } from './component/home/home.component';
import { CardComponent } from './component/card/card.component';
import { TableComponent } from './component/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './component/popup/popup.component';
import { UserdetailComponent } from './component/userdetail/userdetail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    HomeComponent,
    CardComponent,
    TableComponent,
    PopupComponent,
    UserdetailComponent,
    LoginComponent,
    RegisterComponent,
    
       
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
