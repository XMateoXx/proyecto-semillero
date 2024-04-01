import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Programa } from 'src/app/Model/Programa';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastService } from 'src/app/service/toast.service';
import { ProgramaService } from 'src/app/service/programa.service';
import { Facultad } from 'src/app/Model/Facultad';
import { FacultadService } from 'src/app/service/facultad.service';

@Component({
  selector: 'app-asignatura-popup',
  templateUrl: './asignatura-popup.component.html',
  styleUrls: ['./asignatura-popup.component.css']
})
export class AsignaturaPopupComponent implements OnInit {
  submit = false;
  hide = true;
  lista_facultad!: Facultad[];
  inputdata: any;
  idPrograma: any = null;
  dataPrograma!: Programa;
  editdata: any = null;
  closemessage = 'closed using directive';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<AsignaturaPopupComponent>,
    private formBuilder: FormBuilder,
    private service: ProgramaService,
    private _servicioFacultad: FacultadService,
    private _servicioToast: ToastService
  ) {
    this.cargar_facultades();
  }


  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.code > 0) {
      this.setpopupdata(this.inputdata.code);
    }
  }

  cargar_facultades() {
    this._servicioFacultad.GetFacultadActivo().subscribe((res) => {
      this.lista_facultad = res;
    });
  }

  setpopupdata(code: any) {
    this.service.obtenerProgramaByCode(code).subscribe((item) => {
      console.log(item);
      this.idPrograma = code;
      this.editdata = item;
      this.myform.setValue({
        nombre: this.editdata.nombre,
        descripcion: this.editdata.descripcion,
        idfacultad: this.editdata.idfacultad,
      });
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    idfacultad: new FormControl('', [Validators.required]),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.myform.controls;
  }

  guardarPrograma() {
    this.submit = true;
    if (this.myform.valid){
      if (this.editdata != null) {
        this.dataPrograma = {
          id: this.idPrograma,
          nombre: this.myform.value.nombre!,
          descripcion: this.myform.value.descripcion!,
          idfacultad: this.myform.value.idfacultad!,
        };
        this.service.actualizarPrograma(this.dataPrograma).subscribe({
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
            this._servicioToast.mostrarError(
              'Error al actualizar.',
              'Error',
              1000
            );
          },
        });
      } else {
        this.service.guardarPrograma(this.myform.value).subscribe({
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
            this._servicioToast.mostrarError(
              'Error al registrar.',
              'Error',
              1000
            );
          },
        });
      }

    }
  }

  resertForm() {
    this.submit = false;
    this.myform.reset();
    this.editdata = null;
    this.idPrograma = null;
    this.dataPrograma = {
      id: 0,
      nombre: '',
      descripcion: '',
      idfacultad: '',
    };
  }


}
