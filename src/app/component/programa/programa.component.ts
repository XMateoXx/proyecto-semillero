import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProgramaService } from 'src/app/service/programa.service';
import { MatTableDataSource } from '@angular/material/table';
import { Programa } from 'src/app/Model/Programa';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'src/app/service/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ProgramaPopupComponent } from './programa-popup/programa-popup.component';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css']
})
export class ProgramaComponent {

  pdataSource: any;

  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'idfacultad',
    'estado',
    'action'
  ];
  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _toastService: ToastService, private dialog: MatDialog, private pService: ProgramaService, private _serviceTitle: Title){
    this.cargarTablaPrograma();
    _serviceTitle.setTitle("Modulo de Programa");
  }
  cargarTablaPrograma(){
    this.pService.obtenerProgramas().subscribe((res) =>{
      console.log(res);
      this.pdataSource = new MatTableDataSource<Programa>(res);
      this.pdataSource.paginator = this.paginatior;
      this.pdataSource.sort = this.sort;
    });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.pdataSource.filter = value;
  }

  agregarPrograma(){
    this.Openpopup(0, "Agregar Programa", ProgramaPopupComponent);
  }

  async editarPrograma(code: any){
    const confirmacion = await this._toastService.mostrarConfirmacion(
      '¿Estás seguro que deseas editar esta programa?',
      5000 
    );
    if (confirmacion) {
      this.Openpopup(code, 'Editar Programa', ProgramaPopupComponent);
    } else{
      this._toastService.mostrarInfo('Accion editar cancelada', 'Información', 3000);
    }
  }

  async eliminarPrograma(code: any)
  {
    const confirmacion = await this._toastService.mostrarConfirmacion(
      '¿Estás seguro que deseas deshabilitar esta programa?',
      7000
  );
  if (confirmacion) {
      this.pService.deshabilitarPrograma(code).subscribe((res) => {
          this._toastService.mostrarExito(
              'Programa deshabilitada correctamente.',
              'Aprobado',
              2000
          );
          this.cargarTablaPrograma();
      }
      );
  } else {
      this._toastService.mostrarInfo('Accion deshabilitar cancelada', 'Información', 3000);
  }
  }

  async activarPrograma(code: any){
    const confirmacion = await this._toastService.mostrarConfirmacion(
      '¿Estás seguro que deseas activar esta programa?',
      7000
  );
  if (confirmacion) {
      this.pService.activarPrograma(code).subscribe((res) => {
          this._toastService.mostrarExito(
              'Programa activada correctamente.',
              'Aprobado',
              2000
          );
          this.cargarTablaPrograma();
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
      this.cargarTablaPrograma();
    });
  }
}
