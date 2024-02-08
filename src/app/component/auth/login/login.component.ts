import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/auth/login.service';
import { LoginRequest } from 'src/app/service/auth/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginError:string="";
  loginForm=this.formBuilder.group({
    username:['usuario',[Validators.required]],
    password: ['',Validators.required],
  })

  constructor(private router: Router, private titleService: Title, private formBuilder:FormBuilder, private loginServices: LoginService) {
    this.titleService.setTitle("Inicio de session");
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
    return this.loginForm.controls.username;
  }

  get password()
  {
    return this.loginForm.controls.password;
  }

  login(){
    if (this.loginForm.valid){
      this.loginError="";
      this.loginServices.login(this.loginForm.value as LoginRequest).subscribe({
        next: (response) => {
          console.log(response);

          console.info("Login completo");
          this.router.navigateByUrl('/card');
          this.loginForm.reset();
        },
        error: async (errorData) => {
          console.error(errorData);
          this.loginError=errorData;
        }
      })
    }
    else {
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }
  
}