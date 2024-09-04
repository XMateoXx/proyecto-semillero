import { Component, OnInit, ViewChild} from '@angular/core';
import { EvaluacionService } from './service/evaluacion.service';
import { FiltroBancopreguntas } from 'src/app/Model/bancopreguntas';
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
  preguntas: FiltroBancopreguntas[] = []; // Inicializa como un arreglo vacío
  contador: number = 0;
  maxBancopregunta!: number;
  idnivel: number = 2;


  constructor(private _router: Router, private _location: Location, private evaluacionService: EvaluacionService,
    private _servicioToast: ToastService) { }

  ngOnInit(): void {
    this.evaluacionService.filtrarBancopreguntas(this.idnivel).subscribe(data => {
      this.preguntas = data;
      console.log(this.preguntas)
    });

    // Obtiene el valor máximo de bancopregunta
    this.evaluacionService.obtenerMaxBancopregunta().subscribe(data => {
      this.maxBancopregunta = data.max_bancopregunta;
      console.log(this.maxBancopregunta); 
    });
  }

  resetCounter() {
    this.contador = 0;
  }

  incrementCounter() {
    return ++this.contador;
  }

  getNombreComportamiento(idComportamiento: number): string {
    const pregunta = this.preguntas.find(p => p.idcomportamiento === idComportamiento);
    return pregunta ? pregunta.nombre_comportamiento : '';
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

