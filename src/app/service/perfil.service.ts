import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './auth/login.service';
import { Perfil } from '../Model/Perfil';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private _baseURL = "http://localhost:8000";
  constructor(private http: HttpClient, private _loginService: LoginService) { }

  obtenerPerfiles():Observable<Perfil[]>{
    let headers = this.header_format();
    return this.http.get<Perfil[]>(`${this._baseURL}/obtener_perfils`, {headers});
  }

  header_format(){
    return new HttpHeaders().set('Authorization', 'Bearer ' + this._loginService.getJWT()['access_token']);
  }
}
