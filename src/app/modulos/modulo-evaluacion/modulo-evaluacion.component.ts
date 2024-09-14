import { Component, OnInit, ViewChild} from '@angular/core';
import { EvaluacionService } from './service/evaluacion.service';
import { FiltroBancopreguntas } from 'src/app/Model/bancopreguntas';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'src/app/service/toast.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginComponent } from 'src/app/component/auth/login/login.component';

@Component({
  selector: 'app-modulo-evaluacion',
  templateUrl: './modulo-evaluacion.component.html',
  styleUrls: ['./modulo-evaluacion.component.css']
})

export class ModuloEvaluacionComponent implements OnInit {
  preguntas: FiltroBancopreguntas[] = [];
  maxBancopregunta!: number;
  idnivel: number = 2;
  groupedQuestions: { [key: number]: FiltroBancopreguntas[] } = {};
  
  subcompetenciasKeys: string[] = [];
  currentPageIndex: number = 0;

  constructor(private _router: Router, private _location: Location, private evaluacionService: EvaluacionService,
    private _servicioToast: ToastService) {}

  ngOnInit(): void {
    this.evaluacionService.filtrarBancopreguntas(this.idnivel).subscribe(data => {
      this.preguntas = data;
      this.groupQuestionsByComportamiento();
      this.subcompetenciasKeys = this.getKeys(this.groupedQuestions);
    });

    this.evaluacionService.obtenerMaxBancopregunta().subscribe(data => {
      this.maxBancopregunta = data.max_bancopregunta;
    });
  }

  groupQuestionsByComportamiento(): void {
    this.groupedQuestions = {};
    this.preguntas.forEach(pregunta => {
      const idComportamiento = pregunta.idcomportamiento;
      if (!this.groupedQuestions[idComportamiento]) {
        this.groupedQuestions[idComportamiento] = [];
      }
      this.groupedQuestions[idComportamiento].push(pregunta);
    });
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  goToNextPage(): void {
    if (this.currentPageIndex < this.subcompetenciasKeys.length - 1) {
      this.currentPageIndex++;
      window.scrollTo(0, 0); // Llevar la página al tope
    } else {
      // Lógica para cuando llegamos al final (botón de "Enviar")
      this.guardarRespuestas(); // Guardar respuestas cuando se llega al final
    }
  }

  goToPreviousPage(): void {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
      window.scrollTo(0,0);
    }
  }

  // Conservar opciones seleccionadas
  selectedAnswers: { [preguntaId: number]: string } = {};

  onAnswerSelected(preguntaId: number, respuesta: string) {
    this.selectedAnswers[preguntaId] = respuesta;
  }

  // Cuando se renderiza la pregunta, comprobamos si ya tiene una respuesta almacenada
  isSelected(preguntaId: number, value: string): boolean {
    return this.selectedAnswers[preguntaId] === value;
  }

  // Obtener y guardar las respuestas

  usuario(){
    return ("null")
  }

  guardarRespuestas() {
    const respuestasFormateadas = Object.keys(this.selectedAnswers).map(preguntaId => {
      const pregunta = this.preguntas.find(p => p.id === +preguntaId);
      return {
        usuario: this.usuario, 
        pregunta: pregunta?.pregunta,
        subcompetencia: pregunta?.nombre_comportamiento,
        respuesta: this.selectedAnswers[+preguntaId],
      };
    });
  
    console.log('Respuestas a enviar:', respuestasFormateadas);
    
    // almacenar localmente
    localStorage.setItem('respuestas', JSON.stringify(respuestasFormateadas));

  }
  
  getNombreComportamiento(idComportamiento: number): string {
    const pregunta = this.preguntas.find(p => p.idcomportamiento === idComportamiento);
    return pregunta ? pregunta.nombre_comportamiento : 'Subcompetencia desconocida';
  }
  

  agregarEncuesta() {
    this._servicioToast.mostrarExito('Auto evaluación guardada correctamente.', 'Aprobado', 2000);
    this.refresh();
  }

  refresh(): void {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([decodeURI(this._location.path())]);
    });
  }
}


