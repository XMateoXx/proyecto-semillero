import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer, usuarios } from 'src/app/Model/Customer';
import { MasterService } from 'src/app/service/master.service';
import { PopupComponent } from './popup/popup.component';
import { UserdetailComponent } from '../../component/userdetail/userdetail.component';
import { Title } from '@angular/platform-browser';
import { ToastService } from 'src/app/service/toast.service'; 

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  customerlist!: Customer[];
  listaUsuarios!: usuarios[];
  dataSource: any;

  displayedColumns: string[] = [
    'id',
    'usuario',
    'contrasena',
    'nombres',
    'apellido1',
    'apellido2',
    'tipodocumento',
    'identificacion',
    'telefono',
    'idperfil',
    'estado',
    'action'
  ];
  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: MasterService, private dialog: MatDialog, private titleService: Title, private _toastServices: ToastService) {
    this.loadcustomer();
    titleService.setTitle("Modulo de Usuario")
  }

  loadcustomer() {
    this.service.GetCustomer().subscribe((res) => {
      console.log(res);
      this.listaUsuarios = res;
      this.dataSource = new MatTableDataSource<usuarios>(this.listaUsuarios);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  // editcustomer(code: any) {
  //   this.Openpopup(code, 'Editar Usuario', PopupComponent);
  // }

  async editcustomer(code: any) {
    const confirmacion = await this._toastServices.mostrarConfirmacion(
      '¿Estás seguro que deseas editar este usuario?',
      5000 
    );
  
    if (confirmacion) {
      this.Openpopup(code, 'Editar Usuario', PopupComponent);
    } else {
      this._toastServices.mostrarInfo('Accion editar cancelada', 'Información', 3000);
    }
  }
  
  detailcustomer(code: any) {
    this.Openpopup(code, 'Detalles del Usuario', UserdetailComponent);
  }

  async eliminarUsuario(id:any) {
    const confirmacion = await this._toastServices.mostrarConfirmacion(
      '¿Estás seguro que deseas inhabilitar este usuario?',
      5000 
    );
    if (confirmacion) {
      this.service.eliminarUsuario(id).subscribe((res) =>
      {
        this.loadcustomer();
      } 
      );
    } else {
      this._toastServices.mostrarInfo('Accion inhabilitar cancelada', 'Información', 3000);
    }
  }

  async activarUsuario(id:any) {
    const confirmacion = await this._toastServices.mostrarConfirmacion(
      '¿Estás seguro que deseas activar este usuario?',
      5000 
    );
    if (confirmacion) {
      this.service.activarUsuario(id).subscribe((res) =>
      {
        this.loadcustomer();
      } 
      );
    } else {
      this._toastServices.mostrarInfo('Accion activar cancelada', 'Información', 3000);
    }
  }

  agregarusuario() {
    this.Openpopup(0, 'Registro Usuario', PopupComponent);
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
      this.loadcustomer();
    });
  }
}
