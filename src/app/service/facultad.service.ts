import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './auth/login.service';
import { Facultad } from '../Model/Facultad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {
  private _baseURL = "http://localhost:8000";
  constructor(private http: HttpClient, private _loginService: LoginService) { }




  getFacultad(): Observable<Facultad[]>{
    let headers = this.header_format();
    return this.http.get<Facultad[]>(`${this._baseURL}/obtener_facultades/`, {headers});
  }

  header_format(){
    return new HttpHeaders().set('Authorization', 'Bearer ' + this._loginService.getJWT()['access_token']);
  }
}
