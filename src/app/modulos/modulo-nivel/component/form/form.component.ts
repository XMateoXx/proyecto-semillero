import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Nivel } from 'src/app/Model/nivel';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NivelService } from '../../services/nivel.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  submit = false;
  hide = true;
  inputdata: any;
  idnivel: any = null;
  dataNivel!: Nivel;
  editdata: any = null;
  closemessage = 'closed using directive';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<FormComponent>,
    private formBuilder: FormBuilder,
    private service: NivelService,
    private _servicioToast: ToastService ){}

  ngOnInit(): void {
      this.inputdata = this.data;
      if (this.inputdata.code > 0) {
        this.setpopupdata(this.inputdata.code);
      }
  }

  setpopupdata(code: any) {
    this.service.GetNivelbycode(code).subscribe((item) => {
      this.idnivel = code;
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

  saveNivel() {
    this.submit = true;
    if (this.myform.valid){
      if (this.editdata != null){
        this.dataNivel = {
          id: this.idnivel,
          nombre: this.myform.value.nombre!,
          descripcion: this.myform.value.descripcion!
        }
        this.service.actualizarNivel(this.dataNivel).subscribe({
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
  
        this.service.SaveNivel(this.myform.value).subscribe({
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
    this.idnivel = null;
    this.dataNivel = {
      id: "0",
      nombre: "",
      descripcion: ""
    };
  }

}
