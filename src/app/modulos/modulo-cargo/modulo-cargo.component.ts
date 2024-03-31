import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Cargo, Cargos } from 'src/app/Model/cargo';
import { CargoService } from './service/cargo.service';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ToastService } from 'src/app/service/toast.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormCargoComponent } from './component/form-cargo/form-cargo.component';

@Component({
  selector: 'app-modulo-cargo',
  templateUrl: './modulo-cargo.component.html',
  styleUrls: ['./modulo-cargo.component.css']
})
export class ModuloCargoComponent {
  cargoList!: Cargo[];
  listaCargos!: Cargos[];
  dataSource: any;

  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'idnivel',
    'estado',
    'action'
  ];
@ViewChild(MatPaginator) paginatior!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

constructor(private service:  CargoService, private dialog: MatDialog, private titleService: Title, private _toastServices: ToastService){
  this.loadCargo();
  titleService.setTitle("Modulo de Cargo")
}

loadCargo() {
  this.service.GetCargo().subscribe((res => {
    this.listaCargos = res;
    this.dataSource = new MatTableDataSource<Cargos>(this.listaCargos);
    this.dataSource.paginator = this.paginatior;
    this.dataSource.sort = this.sort;
  }));
}

Filterchange(data: Event) {
  const value = (data.target as HTMLInputElement).value;
  this.dataSource.filter = value;
}

agregarCargo(){
  this.Openpopup(0, 'Agregar un Cargo nuevo', FormCargoComponent)
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
    this.loadCargo();
  });
}

async editCargo(code:any){
  const confirmacion = await this._toastServices.mostrarConfirmacion(
    '¿Estás seguro que deseas editar este registro?',
    7000 
  );

  if (confirmacion) {
    this.Openpopup(code, 'Editar Cargo', FormCargoComponent);
  } else {
    this._toastServices.mostrarInfo('Accion editar cancelada', 'Información', 3000);
  }
}

async deshabilitarCargo(id:any){
  const confirmacion = await this._toastServices.mostrarConfirmacion(
    '¿Estás seguro que deseas deshabilitar este cargo?',
    7000 
  );
  if (confirmacion) {
    this.service.deshabilitarCargo(id).subscribe((res) =>
    {
      this._toastServices.mostrarExito(
        'Cargo deshabilitado correctamente.',
        'Aprobado',
        2000
      );
      this.loadCargo();
    } 
    );
  } else {
    this._toastServices.mostrarInfo('Accion deshabilitar cancelada', 'Información', 3000);
  }
}

async activarCargo(id:any){
  const confirmacion = await this._toastServices.mostrarConfirmacion(
    '¿Estás seguro que deseas activar este Cargo?',
    7000 
  );
  if (confirmacion) {
    this.service.activarCargo(id).subscribe((res) =>
    {
      this._toastServices.mostrarExito(
        'Carg activado correctamente.',
        'Aprobado',
        2000
      );
      this.loadCargo();
    } 
    );
  } else {
    this._toastServices.mostrarInfo('Accion activar cancelada', 'Información', 3000);
  }
}

}