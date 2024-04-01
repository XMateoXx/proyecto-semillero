import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './auth/login.service';
import { Observable } from 'rxjs';
import { Programa } from '../Model/Programa';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {
  private _baseURL = 'http://localhost:8000';
  constructor(private http: HttpClient, private _loginService: LoginService) {}

  obtenerProgramas(): Observable<Programa[]> {
    let headers = this.header_format();
    return this.http.get<Programa[]>(`${this._baseURL}/obtener_programas/`, {
      headers,
    });
  }

  obtenerProgramaByCode(code: any) {
    let headers = this.header_format();
    return this.http.get(`${this._baseURL}/obtener_programa/` + code, {
      headers,
    });
  }

  obtenerProgramaActivo(): Observable<Programa[]> {
    let headers = this.header_format();
    return this.http.get<Programa[]>(
      `${this._baseURL}/obtener_programa_activos`,
      { headers }
    );
  }

  guardarPrograma(data: any) {
    let headers = this.header_format();
    return this.http.post(`${this._baseURL}/crear_programa/`, data, {
      headers,
    });
  }


  actualizarPrograma(programa: Programa) {
    let headers = this.header_format();
    return this.http.put(
      `${this._baseURL}/actualizar_programa/`,
      programa,
      { headers }
    );
  }

  deshabilitarPrograma(id: any) {
    let headers = this.header_format();
    return this.http.put(
      `${this._baseURL}/deshabilitar_programa/` + id,
      { programa_id: id },
      { headers }
    );
  }

  activarPrograma(id: any) {
    let headers = this.header_format();
    return this.http.put(
      `${this._baseURL}/activar_programa/` + id,
      { programa_id: id },
      { headers }
    );
  }

  header_format() {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this._loginService.getJWT()['access_token']
    );
  }
}
