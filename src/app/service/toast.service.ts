import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  mostrarExito(mensaje: string, titulo:string, duracion: number){
    this.toastr.success(mensaje, titulo,{
      timeOut: duracion,
      positionClass: 'toast-bottom-right'
    });
  }
  mostrarError(mensaje: string, titulo: "Error", duracion: number){
    this.toastr.error(mensaje, titulo,{
      timeOut: duracion,
      positionClass: 'toast-bottom-right'
    });
  }
  
  mostrarInfo(mensaje: string, titulo: string, duracion: number){
    this.toastr.info(mensaje, titulo,{
      timeOut: duracion,
      positionClass: 'toast-bottom-right'
    });

  }
}
