import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bancopreguntas } from '../../../Model/bancopreguntas';
import { LoginService } from '../../../service/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {
    private _baseURL = 'http://localhost:8000';
    constructor(private http: HttpClient, private _loginService: LoginService) {}

  obtenerPreguntas(): Observable<Bancopreguntas[]> {
    let headers = this.header_format();
    return this.http.get<Bancopreguntas[]>(`${this._baseURL}/obtener_bancopreguntas/`, {
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