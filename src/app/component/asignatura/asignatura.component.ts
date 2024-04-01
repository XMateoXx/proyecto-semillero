import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'src/app/service/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { AsignaturaPopupComponent } from './asignatura-popup/asignatura-popup.component';
import { Asignatura } from 'src/app/Model/Asignatura';
import { AsignaturaService } from 'src/app/service/asignatura.service';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrls: ['./asignatura.component.css']
})
export class AsignaturaComponent {
  adataSource: any;

  displayedColumns: string[] = [
    'id',
    'nombre',
    'codigo',
    'descripcion',
    'estado',
    'action'
  ];
  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _toastService: ToastService, private dialog: MatDialog, private aService: AsignaturaService, private _serviceTitle: Title){
    this.cargarTablaAsignatura();
    _serviceTitle.setTitle("Modulo de Asignatura");
  }
  cargarTablaAsignatura(){
    this.aService.obtenerAsignaturas().subscribe((res) =>{
      console.log(res);
      this.adataSource = new MatTableDataSource<Asignatura>(res);
      this.adataSource.paginator = this.paginatior;
      this.adataSource.sort = this.sort;
    });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.adataSource.filter = value;
  }

  agregarAsignatura(){
    this.Openpopup(0, "Agregar Asignatura", AsignaturaPopupComponent);
  }

  async editarAsignatura(code: any){
    const confirmacion = await this._toastService.mostrarConfirmacion(
      '¿Estás seguro que deseas editar esta Asignatura?',
      5000 
    );
    if (confirmacion) {
      this.Openpopup(code, 'Editar Asignatura', AsignaturaPopupComponent);
    } else{
      this._toastService.mostrarInfo('Accion editar cancelada', 'Información', 3000);
    }
  }

  async eliminarAsignatura(code: any)
  {
    const confirmacion = await this._toastService.mostrarConfirmacion(
      '¿Estás seguro que deseas deshabilitar esta Asignatura?',
      7000
  );
  if (confirmacion) {
      this.aService.deshabilitarAsignatura(code).subscribe((res) => {
          this._toastService.mostrarExito(
              'Asignatura deshabilitada correctamente.',
              'Aprobado',
              2000
          );
          this.cargarTablaAsignatura();
      }
      );
  } else {
      this._toastService.mostrarInfo('Accion deshabilitar cancelada', 'Información', 3000);
  }
  }

  async activarAsignatura(code: any){
    const confirmacion = await this._toastService.mostrarConfirmacion(
      '¿Estás seguro que deseas activar esta Asignatura?',
      7000
  );
  if (confirmacion) {
      this.aService.activarAsignatura(code).subscribe((res) => {
          this._toastService.mostrarExito(
              'Asignatura activada correctamente.',
              'Aprobado',
              2000
          );
          this.cargarTablaAsignatura();
      }
      );
  } else 
  {
      this._toastService.mostrarInfo('Accion activar cancelada', 'Información', 3000);
  }

  }

  Openpopup(code: any, title: any, component: any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code,
      },
    });
    _popup.afterClosed().subscribe((item) => {
      // console.log(item)
      this.cargarTablaAsignatura();
    });
  }
}
