import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asignatura } from '../../../Model/Asignatura';
import { Observable } from 'rxjs';
import { LoginService } from '../../../service/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  private _baseURL = 'http://localhost:8000';
  constructor(private http: HttpClient, private _loginService: LoginService) {}

  obtenerAsignaturas(): Observable<Asignatura[]> {
    let headers = this.header_format();
    return this.http.get<Asignatura[]>(`${this._baseURL}/obtener_asignaturas/`, {
      headers,
    });
  }

  obtenerAsignaturaByCode(code: any) {
    let headers = this.header_format();
    return this.http.get(`${this._baseURL}/obtener_asignatura/` + code, {
      headers,
    });
  }

  obtenerAsignaturaActivo(): Observable<Asignatura[]> {
    let headers = this.header_format();
    return this.http.get<Asignatura[]>(
      `${this._baseURL}/obtener_asignatura_activos`,
      { headers }
    );
  }

  guardarAsignatura(data: any) {
    let headers = this.header_format();
    return this.http.post(`${this._baseURL}/crear_asignatura/`, data, {
      headers,
    });
  }


  actualizarAsignatura(asignatura: Asignatura) {
    let headers = this.header_format();
    return this.http.put(
      `${this._baseURL}/actualizar_asignatura/`,
      asignatura,
      { headers }
    );
  }

  deshabilitarAsignatura(id: any) {
    let headers = this.header_format();
    return this.http.put(
      `${this._baseURL}/deshabilitar_asignatura/` + id,
      { asignatura_id: id },
      { headers }
    );
  }

  activarAsignatura(id: any) {
    let headers = this.header_format();
    return this.http.put(
      `${this._baseURL}/activar_asignatura/` + id,
      { asignatura_id: id },
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
