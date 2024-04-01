import { Component, ViewChild } from '@angular/core';
import { Facultad_PopupComponent } from './popup/facultad-popup.component';
import { Title } from '@angular/platform-browser';
import { FacultadService } from 'src/app/service/facultad.service';
import { MatTableDataSource } from '@angular/material/table';
import { Facultad } from 'src/app/Model/Facultad';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'src/app/service/toast.service';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-facultad',
  templateUrl: './facultad.component.html',
  styleUrls: ['./facultad.component.css']
})
export class FacultadComponent {
  fdataSource: any;

  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'estado',
    'action'
  ];
  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _toastService: ToastService, private dialog: MatDialog, private fService: FacultadService, private _serviceTitle: Title){
    this.cargarTablaFacultades();
    _serviceTitle.setTitle("Modulo de Facultad");
  }
  cargarTablaFacultades(){
    this.fService.getFacultad().subscribe((res) =>{

      this.fdataSource = new MatTableDataSource<Facultad>(res);
      this.fdataSource.paginator = this.paginatior;
      this.fdataSource.sort = this.sort;
    });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.fdataSource.filter = value;
  }

  agregarFacultad(){
    this.Openpopup(0, "Agregar Facultad", Facultad_PopupComponent);
  }

  async editarFacultad(code: any){
    const confirmacion = await this._toastService.mostrarConfirmacion(
      '¿Estás seguro que deseas editar esta facultad?',
      5000 
    );
    if (confirmacion) {
      this.Openpopup(code, 'Editar Facultad', Facultad_PopupComponent);
    } else{
      this._toastService.mostrarInfo('Accion editar cancelada', 'Información', 3000);
    }
  }

  eliminarFacultad(code: any)
  {

  }

  activarFacultad(code: any){

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
      this.cargarTablaFacultades();
    });
  }
}
