import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisterDataService {

  constructor(private http: HttpClient) { }
  // TODO Quitar any y hacer interfaz de datos registro
  public registrar(data: any){
    return this.http.post('localhost:2700/registrar', data);
  }
}
