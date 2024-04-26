import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModuloGrupoService } from '../service/modulo-grupo.service';
import { ToastService } from 'src/app/service/toast.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-grupo-popup',
  templateUrl: './grupo-popup.component.html',
  styleUrls: ['./grupo-popup.component.css']
})
export class GrupoPopupComponent  implements OnInit{
  submit = false;
  hide = true;
  inputdata: any;
  idGrupo: any;
  editdata: any = null;
  closemessage = 'closed using directive';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<GrupoPopupComponent>,
    private formBuilder: FormBuilder,
    private service: ModuloGrupoService,
    private _servicioToast: ToastService
  ) {}
  



  ngOnInit(){
    this.inputdata = this.data;
    if (this.inputdata.code > 0) {
      this.setpopupdata(this.inputdata.code);
    }
  }

  setpopupdata(code: any) {
    this.service.ObtenerGrupobycode(code).subscribe((item) => {
        this.idGrupo = code;
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

  guardarGrupo(){

  }

  resertForm() {
/*     this.submit = false;
    this.myform.reset();
    this.editdata = null;
    this.idFacultad = null;
    this.dataFacultad = {
        id: 0,
        nombre: "",
        descripcion: ""
    }; */
}
}
