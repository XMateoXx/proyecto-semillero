import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoEvaluacion } from 'src/app/Model/tipo-evaluacion';
import { LoginService } from 'src/app/service/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class TipoEvaluacionService {
  private _baseURL = "http://localhost:8000";
  constructor(private http: HttpClient, private _loginService: LoginService) { }

  GetTipoEvaluacion():Observable<TipoEvaluacion[]>{
    let headers = this.header_format();
    return this.http.get<TipoEvaluacion[]>(`${this._baseURL}/obtener_tipoevaluacions`, {headers});
  }

  SaveTipoEvaluacion(data:any){
    let headers = this.header_format();
    return this.http.post(`${this._baseURL}/crear_tipoevaluacion`,data, {headers});
  }

  GetTipoEvaluacionbycode(code:any){
    let headers = this.header_format();
    return this.http.get(`${this._baseURL}/obtener_tipoevaluacion/`+code, {headers});
  }

  actualizarTipoEvaluacion(TipoEvaluacion: TipoEvaluacion){
    let headers = this.header_format();
    return this.http.put(`${this._baseURL}/actualizar_tipoevaluacion`,TipoEvaluacion, {headers});
  }

  deshabilitarTipoEvaluacion(id: any){
    let headers = this.header_format();
    return this.http.put(`${this._baseURL}/deshabilitar_tipoevaluacion/`+id,{"tipoevaluacion_id": id} , {headers});
  }

  activarTipoEvaluacion(id: any){
    let headers = this.header_format();
    return this.http.put(`${this._baseURL}/activar_tipoevaluacion/`+id,{"tipoevaluacion_id": id} , {headers});
  }

  header_format(){
    return new HttpHeaders().set('Authorization', 'Bearer ' + this._loginService.getJWT()['access_token']);
  }
}
