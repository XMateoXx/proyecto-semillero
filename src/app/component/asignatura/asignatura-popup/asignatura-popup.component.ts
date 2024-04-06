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
import { AsignaturaService } from 'src/app/service/asignatura.service';
import { Asignatura } from 'src/app/Model/Asignatura';

@Component({
  selector: 'app-asignatura-popup',
  templateUrl: './asignatura-popup.component.html',
  styleUrls: ['./asignatura-popup.component.css']
})
export class AsignaturaPopupComponent implements OnInit {
  submit = false;
  hide = true;
  lista_facultad!: Facultad[];
  lista_asignatura!: Asignatura[];
  inputdata: any;
  idAsignatura: any = null;
  dataAsignatura!: Asignatura;
  editdata: any = null;
  closemessage = 'closed using directive';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<AsignaturaPopupComponent>,
    private formBuilder: FormBuilder,
    private service: ProgramaService,
    private _servicioAsignatura: AsignaturaService,
    private _servicioToast: ToastService
  ) {
    this.cargar_asignatura();
  }


  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.code > 0) {
      this.setpopupdata(this.inputdata.code);
    }
  }

  cargar_asignatura() {
    this._servicioAsignatura.obtenerAsignaturaActivo().subscribe((res) => {
      this.lista_asignatura = res;
    });
  }

  setpopupdata(code: any) {
    this._servicioAsignatura.obtenerAsignaturaByCode(code).subscribe((item) => {
      console.log(item);
      this.idAsignatura = code;
      this.editdata = item;
      this.myform.setValue({
        nombre: this.editdata.nombre,
        descripcion: this.editdata.descripcion,
        codigo: this.editdata.codigo,
      });
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    codigo: new FormControl('', [Validators.required]),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.myform.controls;
  }

  guardarAsignatura() {
    this.submit = true;
    if (this.myform.valid){
      if (this.editdata != null) {
        this.dataAsignatura = {
          id: this.idAsignatura,
          nombre: this.myform.value.nombre!,
          descripcion: this.myform.value.descripcion!,
          codigo: this.myform.value.codigo!,
        };
        this._servicioAsignatura.actualizarAsignatura(this.dataAsignatura).subscribe({
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
        this._servicioAsignatura.guardarAsignatura(this.myform.value).subscribe({
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
    this.idAsignatura = null;
    this.dataAsignatura = {
      id: "0",
      nombre: '',
      descripcion: '',
      codigo: '',
    };
  }


}
