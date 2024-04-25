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
import { TableComponent } from './modulos/modulo-usuario/table.component';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './modulos/modulo-usuario/popup/popup.component';
import { UserdetailComponent } from './component/userdetail/userdetail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// MODULOS
import { ModuloNivelComponent } from './modulos/modulo-nivel/modulo-nivel.component';
import { FormComponent } from './modulos/modulo-nivel/component/form/form.component';
import { ModuloCargoComponent } from './modulos/modulo-cargo/modulo-cargo.component';
import { FormCargoComponent } from './modulos/modulo-cargo/component/form-cargo/form-cargo.component';
import { ModuloTipoEvaluacionComponent } from './modulos/modulo-tipo-evaluacion/modulo-tipo-evaluacion.component';
import { FormTipoEComponent } from './modulos/modulo-tipo-evaluacion/component/form-tipo-e/form-tipo-e.component';
import { ModuloCompetenciaComponent } from './modulos/modulo-competencia/modulo-competencia.component';
import { FormCompetenciaComponent } from './modulos/modulo-competencia/component/form-competencia/form-competencia.component';
import { ModuloComportamientoComponent } from './modulos/modulo-comportamiento/modulo-comportamiento.component';
import { FormComportamientoComponent } from './modulos/modulo-comportamiento/component/form-comportamiento/form-comportamiento.component';
import { ModuloGrupoComponent } from './modulos/modulo-grupo/modulo-grupo.component';

// Corregir: Colocar dentro de la carpeta de modulos
import { Facultad_PopupComponent } from './modulos/modulo-facultad/popup/facultad-popup.component'; 
import { ProgramaPopupComponent } from './modulos/modulo-programa/programa-popup/programa-popup.component';
import { AsignaturaPopupComponent } from './modulos/modulo-asignatura/asignatura-popup/asignatura-popup.component'; 
import { FacultadComponent } from './modulos/modulo-facultad/facultad.component'; 
import { ProgramaComponent } from './modulos/modulo-programa/programa.component'; 
import { AsignaturaComponent } from './modulos/modulo-asignatura/asignatura.component'; 


/////////////// 
import { ModuloEvaluacionComponent } from './modulos/modulo-evaluacion/modulo-evaluacion.component'; 



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
    FacultadComponent,
    ProgramaComponent,
    AsignaturaComponent,
    ModuloNivelComponent,
    FormComponent,
    ModuloCargoComponent,
    FormCargoComponent,
    ModuloTipoEvaluacionComponent,
    FormTipoEComponent,
    ModuloCompetenciaComponent,
    FormCompetenciaComponent,
    ModuloComportamientoComponent,
    FormComportamientoComponent,
    Facultad_PopupComponent,
    ProgramaPopupComponent,
    AsignaturaPopupComponent,
    ModuloGrupoComponent,

    /////
    ModuloEvaluacionComponent
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
