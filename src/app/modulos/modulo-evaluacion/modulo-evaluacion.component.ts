import { Component, OnInit, ViewChild} from '@angular/core';
import { EvaluacionService } from './service/evaluacion.service';
import { Bancopreguntas } from 'src/app/Model/bancopreguntas';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'src/app/service/toast.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-modulo-evaluacion',
  templateUrl: './modulo-evaluacion.component.html',
  styleUrls: ['./modulo-evaluacion.component.css']
})
export class ModuloEvaluacionComponent implements OnInit {
  
@ViewChild(MatPaginator) paginatior!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
  preguntas!: Bancopreguntas[];


  constructor(private _router: Router, private _location: Location, private evaluacionService: EvaluacionService,
    private _servicioToast: ToastService) { }

  ngOnInit(): void {
    this.evaluacionService.obtenerPreguntas().subscribe(data => {
      this.preguntas = data;
      console.log(this.preguntas)
    });
  }
  agregarEncuesta(){
    this._servicioToast.mostrarExito(
      'Encuesta guardada correctamente.',
      'Aprobado',
      2000
    );
    //this.router.navigate(['/evaluacion_docente']);
    this.refresh();
    
  }

  refresh(): void {
    // Navega a la misma URL para recargar el componente actual
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this._location.path()));
      this._router.navigate([decodeURI(this._location.path())]);
    });
  }
  
}

