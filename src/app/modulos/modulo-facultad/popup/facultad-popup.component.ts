import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Facultad } from 'src/app/Model/Facultad';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastService } from 'src/app/service/toast.service';
import { FacultadService } from 'src/app/modulos/modulo-facultad/service/facultad.service';

@Component({
  selector: 'app-popup',
  templateUrl: './facultad-popup.component.html',
  styleUrls: ['./facultad-popup.component.css'],
})
export class Facultad_PopupComponent implements OnInit {
  submit = false;
  hide = true;
  inputdata: any;
  idFacultad: any = null;
  dataFacultad!: Facultad;
  editdata: any = null;
  closemessage = 'closed using directive';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<Facultad_PopupComponent>,
    private formBuilder: FormBuilder,
    private service: FacultadService,
    private _servicioToast: ToastService
  ) {}

  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.code > 0) {
      this.setpopupdata(this.inputdata.code);
    }
  }

  setpopupdata(code: any) {
    this.service.getFacultadByCode(code).subscribe((item) => {
        this.idFacultad = code;
        this.editdata = item;
        this.myform.setValue({
            nombre: this.editdata.nombre,
            descripcion: this.editdata.descripcion
        });
    });
}

  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.myform.controls;
  }

  guardarFacultad(){
    this.submit = true;
    if (this.myform.valid){
      if (this.editdata != null) {
          this.dataFacultad = {
              id: this.idFacultad,
              nombre: this.myform.value.nombre!,
              descripcion: this.myform.value.descripcion!,
        
          }
          this.service.actualizarFacultad(this.dataFacultad).subscribe({
              next: (response) => {
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
      } else {
  
          this.service.guardarFacultad(this.myform.value).subscribe({
              next: (response) => {
                  this._servicioToast.mostrarExito(
                      'Registrado correctamente.',
                      'Aprobado',
                      1000
                  );
                  this.resertForm();
              },
              error: (response) => {
                  console.log('Error al registrar.');
                  this._servicioToast.mostrarError('Error al registrar.', 'Error', 1000);
              },
          });
      }

    }
  }

  resertForm() {
    this.submit = false;
    this.myform.reset();
    this.editdata = null;
    this.idFacultad = null;
    this.dataFacultad = {
        id: 0,
        nombre: "",
        descripcion: ""
    };
}



}
