import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'src/app/service/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ModuloGrupoService } from './service/modulo-grupo.service';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { Grupo } from 'src/app/Model/Grupo';
import { GrupoPopupComponent } from './popup/grupo-popup.component';

@Component({
  selector: 'app-modulo-grupo',
  templateUrl: './modulo-grupo.component.html',
  styleUrls: ['./modulo-grupo.component.css']
})
export class ModuloGrupoComponent {
  grupoDataSource: any;

  displayedColumns: string[] = [
    'id',
    'programa',
    'asignatura',
    'creditos',
    'descripcion',
    'estado',
    'action'
  ];
  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _toastService: ToastService, private dialog: MatDialog, private grupoService: ModuloGrupoService, private _serviceTitle: Title){
    _serviceTitle.setTitle("Modulo de Grupo");
    this.cargarTablaGrupo();

  }

  cargarTablaGrupo(){
    this.grupoService.ObtenerGrupos().subscribe((res)=>{
      this.grupoDataSource = new MatTableDataSource<Grupo>(res);
      this.grupoDataSource.paginator = this.paginatior;
      this.grupoDataSource.sort = this.sort;
    });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.grupoDataSource.filter = value;
  }

  agregarGrupo(){
    this.Openpopup(0, "Agregar Grupo", GrupoPopupComponent);
  }

  async editarGrupo(code: any){
    const confirmacion = await this._toastService.mostrarConfirmacion(
      '¿Estás seguro que deseas editar esta grupo?',
      5000 
    );
    if (confirmacion) {
      this.Openpopup(code, 'Editar Grupo', ModuloGrupoComponent);
    } else{
      this._toastService.mostrarInfo('Accion editar cancelada', 'Información', 3000);
    }
  }

  async eliminarGrupo(code: any)
  {
    const confirmacion = await this._toastService.mostrarConfirmacion(
      '¿Estás seguro que deseas deshabilitar esta grupo?',
      7000
  );
  if (confirmacion) {
      this.grupoService.deshabilitarGrupo(code).subscribe((res) => {
          this._toastService.mostrarExito(
              'Grupo deshabilitada correctamente.',
              'Aprobado',
              2000
          );
          this.cargarTablaGrupo();
      }
      );
  } else {
      this._toastService.mostrarInfo('Accion deshabilitar cancelada', 'Información', 3000);
  }
  }

  async activarGrupo(code: any){
    const confirmacion = await this._toastService.mostrarConfirmacion(
      '¿Estás seguro que deseas activar esta grupo?',
      7000
  );
  if (confirmacion) {
      this.grupoService.activarGrupo(code).subscribe((res) => {
          this._toastService.mostrarExito(
              'Grupo activada correctamente.',
              'Aprobado',
              2000
          );
          this.cargarTablaGrupo();
      }
      );
  } else {
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
      this.cargarTablaGrupo();
    });
  }
}
