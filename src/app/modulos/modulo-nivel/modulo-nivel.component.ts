import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Nivel } from 'src/app/Model/nivel';
import { ToastService } from 'src/app/service/toast.service';
import { NivelService } from './services/nivel.service';
import { FormComponent } from './component/form/form.component';

@Component({
  selector: 'app-modulo-nivel',
  templateUrl: './modulo-nivel.component.html',
  styleUrls: ['./modulo-nivel.component.css']
})

export class ModuloNivelComponent {
  nivelList!: Nivel[];
  dataSource: any;

  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'estado',
    'action'
  ];
@ViewChild(MatPaginator) paginatior!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

constructor(private service:  NivelService, private dialog: MatDialog, private titleService: Title, private _toastServices: ToastService){
  this.loadNivel();
  titleService.setTitle("Modulo de Nivel")
}

loadNivel() {
  this.service.GetNivel().subscribe((res => {
    this.nivelList = res;
    this.dataSource = new MatTableDataSource<Nivel>(this.nivelList);
    this.dataSource.paginator = this.paginatior;
    this.dataSource.sort = this.sort;
  }));
}

Filterchange(data: Event) {
  const value = (data.target as HTMLInputElement).value;
  this.dataSource.filter = value;
}

agregarusuario(){
  this.Openpopup(0, 'Agregar un nivel nuevo', FormComponent)
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
    this.loadNivel();
  });
}

async editNivel(code:any){
  const confirmacion = await this._toastServices.mostrarConfirmacion(
    '¿Estás seguro que deseas editar este registro?',
    7000 
  );

  if (confirmacion) {
    this.Openpopup(code, 'Editar Nivel', FormComponent);
  } else {
    this._toastServices.mostrarInfo('Accion editar cancelada', 'Información', 3000);
  }
}

async deshabilitarNivel(id:any){
  const confirmacion = await this._toastServices.mostrarConfirmacion(
    '¿Estás seguro que deseas deshabilitar este nivel?',
    7000 
  );
  if (confirmacion) {
    this.service.deshabilitarNivel(id).subscribe((res) =>
    {
      this._toastServices.mostrarExito(
        'Nivel deshabilitado correctamente.',
        'Aprobado',
        2000
      );
      this.loadNivel();
    } 
    );
  } else {
    this._toastServices.mostrarInfo('Accion deshabilitar cancelada', 'Información', 3000);
  }
}

async activarNivel(id:any){
  const confirmacion = await this._toastServices.mostrarConfirmacion(
    '¿Estás seguro que deseas activar este nivel?',
    7000 
  );
  if (confirmacion) {
    this.service.activarNivel(id).subscribe((res) =>
    {
      this._toastServices.mostrarExito(
        'Nivel activado correctamente.',
        'Aprobado',
        2000
      );
      this.loadNivel();
    } 
    );
  } else {
    this._toastServices.mostrarInfo('Accion activar cancelada', 'Información', 3000);
  }
  
}

}