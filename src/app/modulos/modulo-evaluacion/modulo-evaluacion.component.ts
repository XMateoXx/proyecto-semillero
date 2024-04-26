import { Component, OnInit, ViewChild} from '@angular/core';
import { EvaluacionService } from './service/evaluacion.service';
import { Bancopreguntas } from 'src/app/Model/bancopreguntas';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-modulo-evaluacion',
  templateUrl: './modulo-evaluacion.component.html',
  styleUrls: ['./modulo-evaluacion.component.css']
})
export class ModuloEvaluacionComponent implements OnInit {
  
@ViewChild(MatPaginator) paginatior!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
  preguntas!: Bancopreguntas[];


  constructor(private evaluacionService: EvaluacionService) { }

  ngOnInit(): void {
    this.evaluacionService.obtenerPreguntas().subscribe(data => {
      this.preguntas = data;
    });
  }
}

