import { Component, Inject, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoEvaluacion } from 'src/app/Model/tipo-evaluacion';
import { TipoEvaluacionService } from '../../service/tipo-evaluacion.service';
import { ToastService } from 'src/app/service/toast.service';


@Component({
  selector: 'app-form-tipo-e',
  templateUrl: './form-tipo-e.component.html',
  styleUrls: ['./form-tipo-e.component.css']
})
export class FormTipoEComponent {
  submit = false;
  hide = true;
  inputdata: any;
  idTipoEvaluacion: any = null;
  dataTipoEvaluacion!: TipoEvaluacion;
  editdata: any = null;
  closemessage = 'closed using directive';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<FormTipoEComponent>,
    private formBuilder: FormBuilder,
    private service: TipoEvaluacionService,
    private _servicioToast: ToastService ){}

  ngOnInit(): void {
      this.inputdata = this.data;
      if (this.inputdata.code > 0) {
        this.setpopupdata(this.inputdata.code);
      }
  }

  setpopupdata(code: any) {
    this.service.GetTipoEvaluacionbycode(code).subscribe((item) => {
      this.idTipoEvaluacion = code;
      console.log(code)
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
    descripcion: new FormControl('', [Validators.required])
  });

  get f(): { [key: string]: AbstractControl } {
    return this.myform.controls;
  }

  saveTipoEvaluacion() {
    this.submit = true;
    if (this.editdata != null){
      this.dataTipoEvaluacion = {
        id: this.idTipoEvaluacion,
        nombre: this.myform.value.nombre!,
        descripcion: this.myform.value.descripcion!
      }
      this.service.actualizarTipoEvaluacion(this.dataTipoEvaluacion).subscribe({
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
    }else {

      this.service.SaveTipoEvaluacion(this.myform.value).subscribe({
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

  resertForm() {
    this.submit = false;
    this.myform.reset();
    this.editdata = null;
    this.idTipoEvaluacion = null;
    this.dataTipoEvaluacion = {
      id: "0",
      nombre: "",
      descripcion: ""
    };
  }

}
