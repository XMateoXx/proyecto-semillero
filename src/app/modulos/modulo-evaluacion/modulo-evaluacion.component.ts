import { Component, OnInit} from '@angular/core';
import { EvaluacionService } from './service/evaluacion.service';
import { Bancopreguntas } from 'src/app/Model/bancopreguntas';



@Component({
  selector: 'app-modulo-evaluacion',
  templateUrl: './modulo-evaluacion.component.html',
  styleUrls: ['./modulo-evaluacion.component.css']
})
export class ModuloEvaluacionComponent implements OnInit {
  preguntas!: Bancopreguntas[];


  constructor(private evaluacionService: EvaluacionService) { }

  ngOnInit(): void {
    this.evaluacionService.obtenerPreguntas().subscribe(data => {
      this.preguntas = data;
    });
  }
}

