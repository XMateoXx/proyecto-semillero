import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cargo } from 'src/app/Model/cargo';
import { CargoService } from '../../service/cargo.service';
import { ToastService } from 'src/app/service/toast.service';
import { Nivel } from 'src/app/Model/nivel';
import { NivelService } from 'src/app/modulos/modulo-nivel/services/nivel.service';

@Component({
  selector: 'app-form-cargo',
  templateUrl: './form-cargo.component.html',
  styleUrls: ['./form-cargo.component.css']
})
export class FormCargoComponent implements OnInit{

  submit = false;
  hide = true;
  lista_niveles!: Nivel[];
  inputdata: any;
  idCargo: any = null;
  dataCargo!: Cargo;
  editdata: any = null;
  closemessage = 'closed using directive';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<FormCargoComponent>,
    private formBuilder: FormBuilder,
    private service: CargoService,
    private _servicioToast: ToastService,
    private _servicioNivel: NivelService
    ){
      this.cargar_niveles();
    }

  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.code > 0) {
      this.setpopupdata(this.inputdata.code);
    }
  }

  cargar_niveles() {
    this._servicioNivel.GetNivelActivo().subscribe((res) => {
      this.lista_niveles = res;
    });
  }

  setpopupdata(code: any) {
    this.service.GetCargobycode(code).subscribe((item) => {
      this.idCargo = code;
      // console.log(item)
      this.editdata = item;
      this.myform.setValue({
        nombre: this.editdata.nombre,
        descripcion: this.editdata.descripcion,
        idnivel: this.editdata.idnivel,
      });
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }
  
  myform = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    idnivel: new FormControl('', [Validators.required])
  });

  get f(): { [key: string]: AbstractControl } {
    return this.myform.controls;
  }

  saveCargo() {
    this.submit = true;
    if (this.myform.valid){
      if (this.editdata != null){
        this.dataCargo = {
          id: this.idCargo,
          nombre: this.myform.value.nombre!,
          descripcion: this.myform.value.descripcion!,
          idnivel: Number(this.myform.value.idnivel!)
        }
        this.service.actualizarCargo(this.dataCargo).subscribe({
          next: (response) => {
            this._servicioToast.mostrarExito(
              'Actualizado correctamente.',
              'Aprobado',
              1000
            );
            this.resertForm();
          },
          error: (response) => {
            console.log('Error al actualizar.');
            this._servicioToast.mostrarError('Error al actualizar.', 'Error', 1000);
          },
        });
      }else {
        this.service.SaveCargo(this.myform.value).subscribe({
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
    this.idCargo = null;
    this.dataCargo = {
      id: "0",
      nombre: "",
      descripcion: "",
      idnivel: 0,
    };
  }
  

}

