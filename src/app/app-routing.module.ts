import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CardComponent } from './component/card/card.component';
import { TableComponent } from './component/table/table.component';
import { MenubarComponent } from './component/menubar/menubar.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/register/register.component';



const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'card',component:CardComponent},
  {path:'table',component:TableComponent},
  {path:'login',component:LoginComponent, data: {title: "Inicio de sessión"}},
  {path:'menubar',component:MenubarComponent},
  {path:'register',component:RegisterComponent},
  { path: '**', redirectTo: 'register' }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
