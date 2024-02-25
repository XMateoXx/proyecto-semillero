import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/auth/login.service';
import { LoginRequest } from 'src/app/service/auth/login-request';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginError:string="";
  loginForm=this.formBuilder.group({
    usuario:['',[Validators.required]],
    contrasena: ['',Validators.required],
  })

  constructor(private router: Router, private titleService: Title, private formBuilder:FormBuilder, private loginServices: LoginService, private _toastServices: ToastService) {
    this.titleService.setTitle("Ingresar al Sistema");
    const isLoggin = sessionStorage.getItem('jwt');
    if (isLoggin) this.router.navigate(['/principal']);
  }
  ngOnInit(): void{
    
  }

  /* onSubmit() {

    if (this.username === 'usuario' && this.password === '123') {

      this.router.navigate(['/menubar']);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  } */

  get username(){
    return this.loginForm.controls.usuario;
  }

  get password()
  {
    return this.loginForm.controls.contrasena;
  }

  login(){
    if (this.loginForm.valid){
      this.loginError="";
      this.loginServices.login(this.loginForm.value as LoginRequest).subscribe({
        next: (response) => {
          this.loginServices.setJWT(response);
          console.log("currentData", this.loginServices.currentUserData.value);
          let nombrecompleto = this.loginServices.currentUserData.value.nombre + " " + this.loginServices.currentUserData.value.apellido
          this._toastServices.mostrarExito("Bienvenido "+nombrecompleto , "Exito", 2000)
          console.info("Login completo");
          this.router.navigateByUrl('/principal');
          this.loginForm.reset();
        },
        error: async (errorData) => {
          console.error(errorData);
          this._toastServices.mostrarError("Error al ingresar", "Error", 2000);
          this.loginError=errorData;
        }
      })
    }
    else {
      this.loginForm.markAllAsTouched();
      this._toastServices.mostrarError("Llene los campos correspondientes", "Error", 5000);
    }
  }
  
}