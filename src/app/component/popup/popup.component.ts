import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  hide = true;
  inputdata: any;
  editdata: any;
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
      this.editdata = item;
      this.myform.setValue({
        username: this.editdata.username,
        contrasena: this.editdata.contrasena,
        nombres: this.editdata.nombres,
        apellido1: this.editdata.apellido1,
        apellido2: this.editdata.apellido2,
        tipodocumento: this.editdata.tipodocumento,
        identificacion: this.editdata.identificacion,
        telefono: this.editdata.telefono
      });
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = new FormGroup({
    username: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [Validators.required]),
    nombres: new FormControl('', [Validators.required]),
    apellido1: new FormControl('', [Validators.required]),
    apellido2: new FormControl('', [Validators.required]),
    tipodocumento: new FormControl('', [Validators.required]),
    identificacion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required])
  });

  Saveuser() {
    this.service.Savecustomer(this.myform.value).subscribe({
      next: (response) => {
         //TODO implementar Toast 
         this._servicioToast.mostrarExito("Registrado correctamente.", 'Aprobado', 1000);
        },
        error: (response) => {
          //TODO implementar Toast 
          console.log("Error al registrar.");
          this._servicioToast.mostrarError('Error al registrar.','Error', 1000);
      }
    });
  }
}
