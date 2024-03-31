import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo, Cargos } from 'src/app/Model/cargo';
import { LoginService } from 'src/app/service/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private _baseURL = "http://localhost:8000";
  constructor(private http: HttpClient, private _loginService: LoginService) { }

  GetCargo():Observable<Cargos[]>{
    let headers = this.header_format();
    return this.http.get<Cargos[]>(`${this._baseURL}/obtener_cargos`, {headers});
  }

  SaveCargo(data:any){
    let headers = this.header_format();
    return this.http.post(`${this._baseURL}/crear_cargo`,data, {headers});
  }

  GetCargobycode(code:any){
    let headers = this.header_format();
    return this.http.get(`${this._baseURL}/obtener_cargo/`+code, {headers});
  }

  actualizarCargo(Cargo: Cargo){
    let headers = this.header_format();
    return this.http.put(`${this._baseURL}/actualizar_cargo`,Cargo, {headers});
  }

  deshabilitarCargo(id: any){
    let headers = this.header_format();
    return this.http.put(`${this._baseURL}/deshabilitar_cargo/`+id,{"cargo_id": id} , {headers});
  }

  activarCargo(id: any){
    let headers = this.header_format();
    return this.http.put(`${this._baseURL}/activar_cargo/`+id,{"cargo_id": id} , {headers});
  }

  header_format(){
    return new HttpHeaders().set('Authorization', 'Bearer ' + this._loginService.getJWT()['access_token']);
  }
}
