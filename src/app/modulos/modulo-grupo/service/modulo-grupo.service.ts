import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupo } from 'src/app/Model/Grupo';
import { LoginService } from 'src/app/service/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class ModuloGrupoService {
  private _baseURL = "http://localhost:8000";
  constructor(private http: HttpClient, private _loginService: LoginService) { }

  ObtenerGrupos():Observable<Grupo[]>{
    let headers = this.header_format();
    return this.http.get<Grupo[]>(`${this._baseURL}/obtener_grupo_asignaturas`, {headers});
  }

  GuardarGrupos(data:any){
    let headers = this.header_format();
    return this.http.post(`${this._baseURL}/crear_grupo_asignatura`,data, {headers});
  }

  ObtenerGrupobycode(code:any){
    let headers = this.header_format();
    return this.http.get(`${this._baseURL}/obtener_grupo_asignatura/`+code, {headers});
  }

  actualizarGrupo(Group: Grupo){
    let headers = this.header_format();
    return this.http.put(`${this._baseURL}/actualizar_grupo_asignatura`,Group, {headers});
  }

  deshabilitarGrupo(id: any){
    let headers = this.header_format();
    return this.http.put(`${this._baseURL}/deshabilitar_grupo_asignatura/`+id,{"grupo_id": id} , {headers});
  }

  activarGrupo(id: any){
    let headers = this.header_format();
    return this.http.put(`${this._baseURL}/activar_grupo_asignatura/`+id,{"grupo_id": id} , {headers});
  }

  header_format(){
    return new HttpHeaders().set('Authorization', 'Bearer ' + this._loginService.getJWT()['access_token']);
  }
}
