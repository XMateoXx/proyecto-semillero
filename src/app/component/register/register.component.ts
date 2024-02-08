import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RegisterDataService } from 'src/app/service/register-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 
  public formulario_registro!: FormGroup;
  
  constructor(private router: Router, private _servicioregistro: RegisterDataService, private formBuilder: FormBuilder, private titleService: Title) {
    this.titleService.setTitle("Registro de Usuario");
    this.formulario_registro = this.formBuilder.group(
      {
        username: new FormControl('', [Validators.required]),
        contrasena: new FormControl('', [Validators.required]),
        nombres: new FormControl('', [Validators.required]),
        apellido1: new FormControl('', [Validators.required]),
        apellido2: new FormControl('', [Validators.required]),
        tipodocumento: new FormControl('', [Validators.required]),
        identificacion: new FormControl('', [Validators.required]),
        telefono: new FormControl('', [Validators.required]),
      }
    );
  }

  public guardar(){
    this._servicioregistro.registrar(this.formulario_registro.value).subscribe(
      {
        next: (response) => {
           //TODO implementar Toast 
           console.log("Registrado correctamente.");
           this.formulario_registro.reset();
          },
          error: (response) => {
          //TODO implementar Toast 
          console.log("Error al registrar.");
        }
      }
    )
  }

}
