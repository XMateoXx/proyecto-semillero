import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TipoEvaluacion } from 'src/app/Model/tipo-evaluacion';
import { TipoEvaluacionService } from './service/tipo-evaluacion.service';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ToastService } from 'src/app/service/toast.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormTipoEComponent } from './component/form-tipo-e/form-tipo-e.component';

@Component({
  selector: 'app-modulo-tipo-evaluacion',
  templateUrl: './modulo-tipo-evaluacion.component.html',
  styleUrls: ['./modulo-tipo-evaluacion.component.css']
})
export class ModuloTipoEvaluacionComponent {
  tipoEvaluacionList!: TipoEvaluacion[];
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

constructor(private service:  TipoEvaluacionService, private dialog: MatDialog, private titleService: Title, private _toastServices: ToastService){
  this.loadTipoEvaluacion();
  titleService.setTitle("Modulo de TipoEvaluacion")
}

loadTipoEvaluacion() {
  this.service.GetTipoEvaluacion().subscribe((res => {
    this.tipoEvaluacionList = res;
    this.dataSource = new MatTableDataSource<TipoEvaluacion>(this.tipoEvaluacionList);
    this.dataSource.paginator = this.paginatior;
    this.dataSource.sort = this.sort;
  }));
}

Filterchange(data: Event) {
  const value = (data.target as HTMLInputElement).value;
  this.dataSource.filter = value;
}

agregarTipoEvalaucion(){
  this.Openpopup(0, 'Agregar un TipoEvaluacion nuevo', FormTipoEComponent)
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
    this.loadTipoEvaluacion();
  });
}

async editTipoEvaluacion(code:any){
  const confirmacion = await this._toastServices.mostrarConfirmacion(
    '¿Estás seguro que deseas editar este registro?',
    7000 
  );

  if (confirmacion) {
    this.Openpopup(code, 'Editar TipoEvaluacion', FormTipoEComponent);
  } else {
    this._toastServices.mostrarInfo('Accion editar cancelada', 'Información', 3000);
  }
}

async deshabilitarTipoEvaluacion(id:any){
  const confirmacion = await this._toastServices.mostrarConfirmacion(
    '¿Estás seguro que deseas deshabilitar este TipoEvaluacion?',
    7000 
  );
  if (confirmacion) {
    this.service.deshabilitarTipoEvaluacion(id).subscribe((res) =>
    {
      this._toastServices.mostrarExito(
        'TipoEvaluacion deshabilitado correctamente.',
        'Aprobado',
        2000
      );
      this.loadTipoEvaluacion();
    } 
    );
  } else {
    this._toastServices.mostrarInfo('Accion deshabilitar cancelada', 'Información', 3000);
  }
}

async activarTipoEvaluacion(id:any){
  const confirmacion = await this._toastServices.mostrarConfirmacion(
    '¿Estás seguro que deseas activar este TipoEvaluacion?',
    7000 
  );
  if (confirmacion) {
    this.service.activarTipoEvaluacion(id).subscribe((res) =>
    {
      this._toastServices.mostrarExito(
        'TipoEvaluacion activado correctamente.',
        'Aprobado',
        2000
      );
      this.loadTipoEvaluacion();
    } 
    );
  } else {
    this._toastServices.mostrarInfo('Accion activar cancelada', 'Información', 3000);
  }
  
}
}
