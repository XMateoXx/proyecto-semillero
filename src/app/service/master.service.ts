import { Injectable } from '@angular/core';
import { colorentity } from '../Entity/colorentity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Country, Customer } from '../Model/Customer';
import { LoginService } from './auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private _baseURL = "http://localhost:8000";
  constructor(private http: HttpClient, private _loginService: LoginService) { }

  GetColorList(): colorentity[] {
    return [
      { code: 'c0', name: 'black' },
      { code: 'c1', name: 'Red' },
      { code: 'c2', name: 'Green' },
      { code: 'c3', name: 'Yellow' },
      { code: 'c4', name: 'White' }
    ]
  }

  GetCustomer():Observable<Customer[]>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this._loginService.getJWT());
    return this.http.get<Customer[]>(`${this._baseURL}/obtener_usuarios`, {headers});
  }

  Savecustomer(data:any){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this._loginService.getJWT());
    return this.http.post(`${this._baseURL}/crear_usuario`,data, {headers});
  }

  GetCustomerbycode(code:any){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this._loginService.getJWT());
    return this.http.get(`${this._baseURL}/obtener_usuario/`+code, {headers});
  }

  actualizarUsuario(usuario: Customer){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this._loginService.getJWT());
    return this.http.put(`${this._baseURL}/actualizar_usuario`,usuario, {headers});
  }
  GetAssociate(){
    return this.http.get(`${this._baseURL}/associate`);
  }
  GetAssociatebycode(code:any){
    return this.http.get(`${this._baseURL}/associate/`+code);
  }
  GetCountry():Observable<Country[]>{
    return this.http.get<Country[]>(`${this._baseURL}/country`);
  }

  SaveAssociate(data:any,code:any){
    return this.http.put(`${this._baseURL}/associate/`+code,data);
  }

}
