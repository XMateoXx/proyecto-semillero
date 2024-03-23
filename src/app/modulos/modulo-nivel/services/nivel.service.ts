import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nivel } from 'src/app/Model/nivel';
import { LoginService } from 'src/app/service/auth/login.service';

@Injectable({
  providedIn: 'root'
})

export class NivelService {
  private _baseURL = "http://localhost:8000";
  constructor(private http: HttpClient, private _loginService: LoginService) { }

  GetNivel():Observable<Nivel[]>{
    let headers = this.header_format();
    return this.http.get<Nivel[]>(`${this._baseURL}/obtener_niveles`, {headers});
  }

  GetNivelActivo():Observable<Nivel[]>{
    let headers = this.header_format();
    return this.http.get<Nivel[]>(`${this._baseURL}/obtener_niveles_activos`, {headers});
  }

  SaveNivel(data:any){
    let headers = this.header_format();
    return this.http.post(`${this._baseURL}/crear_nivel`,data, {headers});
  }

  GetNivelbycode(code:any){
    let headers = this.header_format();
    return this.http.get(`${this._baseURL}/obtener_nivel/`+code, {headers});
  }

  actualizarNivel(nivel: Nivel){
    let headers = this.header_format();
    return this.http.put(`${this._baseURL}/actualizar_nivel`,nivel, {headers});
  }

  deshabilitarNivel(id: any){
    let headers = this.header_format();
    return this.http.put(`${this._baseURL}/deshabilitar_nivel/`+id,{"nivel_id": id} , {headers});
  }

  activarNivel(id: any){
    let headers = this.header_format();
    return this.http.put(`${this._baseURL}/activar_nivel/`+id,{"nivel_id": id} , {headers});
  }

  header_format(){
    return new HttpHeaders().set('Authorization', 'Bearer ' + this._loginService.getJWT()['access_token']);
  }

}

