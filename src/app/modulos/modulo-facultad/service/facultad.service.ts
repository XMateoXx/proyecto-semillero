import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../../../service/auth/login.service';
import { Facultad } from '../../../Model/Facultad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacultadService {
  private _baseURL = 'http://localhost:8000';
  constructor(private http: HttpClient, private _loginService: LoginService) {}

  getFacultad(): Observable<Facultad[]> {
    let headers = this.header_format();
    return this.http.get<Facultad[]>(`${this._baseURL}/obtener_facultades/`, {
      headers,
    });
  }

  getFacultadByCode(code: any) {
    let headers = this.header_format();
    return this.http.get(`${this._baseURL}/obtener_facultad/` + code, {
      headers,
    });
  }

  GetFacultadActivo(): Observable<Facultad[]> {
    let headers = this.header_format();
    return this.http.get<Facultad[]>(
      `${this._baseURL}/obtener_facultades_activos`,
      { headers }
    );
  }

  guardarFacultad(data: any) {
    let headers = this.header_format();
    return this.http.post(`${this._baseURL}/crear_facultad`, data, {
      headers,
    });
  }


  actualizarFacultad(facultad: Facultad) {
    let headers = this.header_format();
    return this.http.put(
      `${this._baseURL}/actualizar_facultad`,
      facultad,
      { headers }
    );
  }

  deshabilitarFacultad(id: any) {
    let headers = this.header_format();
    return this.http.put(
      `${this._baseURL}/deshabilitar_facultad/` + id,
      { facultad_id: id },
      { headers }
    );
  }

  activarFacultad(id: any) {
    let headers = this.header_format();
    return this.http.put(
      `${this._baseURL}/activar_facultad/` + id,
      { facultad_id: id },
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
