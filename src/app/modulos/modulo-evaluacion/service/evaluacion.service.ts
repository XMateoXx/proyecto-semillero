import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FiltroBancopreguntas, MaxBancopreguntas } from '../../../Model/bancopreguntas';
import { LoginService } from '../../../service/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {
    private _baseURL = 'http://localhost:8000';
    constructor(private http: HttpClient, private _loginService: LoginService) {}

    //Usar interpolacion en las demas rutas y no colocar directamente el id
    filtrarBancopreguntas(id: number): Observable<FiltroBancopreguntas[]> {
    let headers = this.header_format();
    return this.http.get<FiltroBancopreguntas[]>(`${this._baseURL}/filtrar_bancopreguntas/${id}`, {
      headers,
    }); 

  }
  //Hacer lo mismo que se hizo en filtraBancopreguntas
  obtenerMaxBancopregunta(): Observable<MaxBancopreguntas> {
    let headers = this.header_format();
    return this.http.get<MaxBancopreguntas>(`${this._baseURL}/max_bancopreguntas/`, {
      headers,
    });
  }


  header_format() {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this._loginService.getJWT()['access_token']
    );
  }
}