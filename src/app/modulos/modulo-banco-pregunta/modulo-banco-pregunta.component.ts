import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';
import { Bancopreguntas } from 'src/app/Model/bancopreguntas';
import { ToastService } from 'src/app/service/toast.service';
import { BancoService } from './services/banco.service';
import { FormBancoComponent } from './component/form-banco/form-banco.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-modulo-banco-pregunta',
  templateUrl: './modulo-banco-pregunta.component.html',
  styleUrls: ['./modulo-banco-pregunta.component.css']
})
export class ModuloBancoPreguntaComponent {
  bancoPreguntaList!: Bancopreguntas[];
  listaBancoPregunta!: Bancopreguntas[];
  dataSource: any;

  displayedColumns: string[] = [
      'id',
      'idnivel',
      'idcomportamiento',
      'pregunta',
      'estado',
      'action'
  ];
  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: BancoService, private dialog: MatDialog, private titleService: Title, private _toastServices: ToastService) {
      this.loadBancopreguntas();
      titleService.setTitle("Modulo de Bancopreguntas")
  }

  loadBancopreguntas() {
      this.service.obtenerBancopreguntass().subscribe((res => {
          this.listaBancoPregunta = res;
          this.dataSource = new MatTableDataSource<Bancopreguntas>(this.listaBancoPregunta);
          this.dataSource.paginator = this.paginatior;
          this.dataSource.sort = this.sort;
      }));
  }

  Filterchange(data: Event) {
      const value = (data.target as HTMLInputElement).value;
      this.dataSource.filter = value;
  }

  agregarBancopreguntas() {
      this.Openpopup(0, 'Agregar un Bancopreguntas nuevo', FormBancoComponent)
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
          this.loadBancopreguntas();
      });
  }

  async editBancopreguntas(code: any) {
      const confirmacion = await this._toastServices.mostrarConfirmacion(
          '¿Estás seguro que deseas editar este registro?',
          7000
      );

      if (confirmacion) {
          this.Openpopup(code, 'Editar Bancopreguntas', FormBancoComponent);
      } else {
          this._toastServices.mostrarInfo('Accion editar cancelada', 'Información', 3000);
      }
  }

  async deshabilitarBancopregunta(id: any) {
      const confirmacion = await this._toastServices.mostrarConfirmacion(
          '¿Estás seguro que deseas deshabilitar este Bancopreguntas?',
          7000
      );
      if (confirmacion) {
          this.service.deshabilitarBancopreguntas(id).subscribe((res) => {
              this._toastServices.mostrarExito(
                  'Bancopreguntas deshabilitado correctamente.',
                  'Aprobado',
                  2000
              );
              this.loadBancopreguntas();
          }
          );
      } else {
          this._toastServices.mostrarInfo('Accion deshabilitar cancelada', 'Información', 3000);
      }
  }

  async activarBancopregunta(id: any) {
      const confirmacion = await this._toastServices.mostrarConfirmacion(
          '¿Estás seguro que deseas activar este Bancopreguntas?',
          7000
      );
      if (confirmacion) {
          this.service.activarBancopreguntas(id).subscribe((res) => {
              this._toastServices.mostrarExito(
                  'Bancopreguntas activado correctamente.',
                  'Aprobado',
                  2000
              );
              this.loadBancopreguntas();
          }
          );
      } else {
          this._toastServices.mostrarInfo('Accion activar cancelada', 'Información', 3000);
      }
  }
}
