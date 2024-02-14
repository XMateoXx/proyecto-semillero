import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/Model/Customer';
import { MasterService } from 'src/app/service/master.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  submit = false;
  hide = true;
  inputdata: any;
  idusuario: any = null;
  datausuario!: Customer;
  editdata: any = null;
  closemessage = 'closed using directive';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupComponent>,
    private formBuilder: FormBuilder,
    private service: MasterService,
    private _servicioToast: ToastService
  ) {}
  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.code > 0) {
      this.setpopupdata(this.inputdata.code);
    }
  }

  setpopupdata(code: any) {
    this.service.GetCustomerbycode(code).subscribe((item) => {
      this.idusuario = code;
      console.log(code)
      this.editdata = item;
      this.myform.setValue({
        usuario: this.editdata.usuario,
        contrasena: this.editdata.contrasena,
        nombres: this.editdata.nombres,
        apellido1: this.editdata.apellido1,
        apellido2: this.editdata.apellido2,
        tipodocumento: this.editdata.tipodocumento,
        identificacion: this.editdata.identificacion,
        telefono: this.editdata.telefono,
        idperfil: this.editdata.idperfil
      });
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = new FormGroup({
    usuario: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    contrasena: new FormControl('', [Validators.required,             Validators.minLength(6),
      Validators.maxLength(40)]),
    nombres: new FormControl('', [Validators.required]),
    apellido1: new FormControl('', [Validators.required]),
    apellido2: new FormControl('', [Validators.required]),
    tipodocumento: new FormControl('', [Validators.required]),
    identificacion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    idperfil: new FormControl('', [Validators.required])
  });

  /*   para acceder a los controles del formulario (form.controls) de la plantilla. 
  Por ejemplo, podemos conseguir username campo en la plantilla 
  usando f.username en lugar de form.controls.username. */
  get f(): { [key: string]: AbstractControl } {
    return this.myform.controls;
  }
  Saveuser() {
    this.submit = true;
    if (this.editdata != null){
      this.datausuario = {
        id: this.idusuario,
        apellido1: this.myform.value.apellido1!,
        apellido2: this.myform.value.apellido2!,
        contrasena: this.myform.value.contrasena!,
        idperfil: Number(this.myform.value.idperfil!),
        nombres: this.myform.value.nombres!,
        identificacion: this.myform.value.identificacion!,
        telefono: this.myform.value.telefono!,
        usuario: this.myform.value.usuario!,
        tipodocumento: this.myform.value.tipodocumento!
      }
      
      
      this.service.actualizarUsuario(this.datausuario).subscribe({
        next: (response) => {
          //TODO implementar Toast
          this._servicioToast.mostrarExito(
            'Actualizado correctamente.',
            'Aprobado',
            1000
          );
          this.resertForm();
         
        },
        error: (response) => {
          //TODO implementar Toast
          console.log('Error al actualizar.');
          this._servicioToast.mostrarError('Error al actualizar.', 'Error', 1000);
        },
      });
    }else {

      this.service.Savecustomer(this.myform.value).subscribe({
        next: (response) => {
          //TODO implementar Toast
          this._servicioToast.mostrarExito(
            'Registrado correctamente.',
            'Aprobado',
            1000
          );
          this.resertForm();
        },
        error: (response) => {
          //TODO implementar Toast
          console.log('Error al registrar.');
          this._servicioToast.mostrarError('Error al registrar.', 'Error', 1000);
        },
      });
    }
  }
  resertForm() {
    this.submit = false;
    this.myform.reset();
    this.editdata = null;
    this.idusuario = null;
    this.datausuario = {
      id: "0",
      apellido1: "",
      apellido2: "",
      contrasena: "",
      idperfil: 0,
      nombres: "",
      identificacion: "",
      telefono: "",
      usuario:"" ,
      tipodocumento: ""
    };
  }
}
