import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  mostrarExito(mensaje: string, titulo: string, duracion: number) {
    /*  this.toastr.success(mensaje, titulo,{
      timeOut: duracion,
      positionClass: 'toast-bottom-right'
    }); */
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: duracion,
    });
  }
  mostrarError(mensaje: string, titulo: 'Error', duracion: number) {
    /* this.toastr.error(mensaje, titulo,{
      timeOut: duracion,
      positionClass: 'toast-bottom-right'
    }); */
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: mensaje,
      showConfirmButton: false,
      timer: duracion,
    });
  }

  mostrarInfo(mensaje: string, titulo: string, duracion: number) {
    /* this.toastr.info(mensaje, titulo,{
      timeOut: duracion,
      positionClass: 'toast-bottom-right'
    }); */
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: mensaje,
      showConfirmButton: false,
      timer: duracion,
    });
  }

  mostrarConfirmacion(mensaje: string, duracion: number){
    Swal.fire({
      title: mensaje,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`,
      timer: duracion,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        return true;
      } 
      return false;
    });
  }
}
