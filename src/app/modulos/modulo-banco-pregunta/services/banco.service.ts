import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bancopreguntas } from 'src/app/Model/bancopreguntas';
import { LoginService } from 'src/app/service/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class BancoService {
  private _baseURL = 'http://localhost:8000';
  constructor(private http: HttpClient, private _loginService: LoginService) {}

  obtenerBancopreguntass(): Observable<Bancopreguntas[]> {
    let headers = this.header_format();
    return this.http.get<Bancopreguntas[]>(`${this._baseURL}/obtener_bancopreguntas/`, {
      headers,
    });
  }

  obtenerBancopreguntasByCode(code: any) {
    let headers = this.header_format();
    return this.http.get(`${this._baseURL}/obtener_bancopregunta/` + code, {
      headers,
    });
  }

  // obtenerBancopreguntasActivo(): Observable<Bancopreguntas[]> {
  //   let headers = this.header_format();
  //   return this.http.get<Bancopreguntas[]>(
  //     `${this._baseURL}/obtener_Bancopreguntas_activos`,
  //     { headers }
  //   );
  // }

  guardarBancopreguntas(data: any) {
    let headers = this.header_format();
    return this.http.post(`${this._baseURL}/crear_bancopregunta/`, data, {
      headers,
    });
  }


  actualizarBancopreguntas(Bancopreguntas: Bancopreguntas) {
    let headers = this.header_format();
    return this.http.put(
      `${this._baseURL}/actualizar_bancopregunta/`,
      Bancopreguntas,
      { headers }
    );
  }

  // deshabilitarBancopreguntas(id: any) {
  //   let headers = this.header_format();
  //   return this.http.put(
  //     `${this._baseURL}/deshabilitar_Bancopreguntas/` + id,
  //     { Bancopreguntas_id: id },
  //     { headers }
  //   );
  // }

  // activarBancopreguntas(id: any) {
  //   let headers = this.header_format();
  //   return this.http.put(
  //     `${this._baseURL}/activar_Bancopreguntas/` + id,
  //     { Bancopreguntas_id: id },
  //     { headers }
  //   );
  // }

  header_format() {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this._loginService.getJWT()['access_token']
    );
  }
}
