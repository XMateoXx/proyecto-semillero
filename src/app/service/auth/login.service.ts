import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Users } from './users';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<Users> =new BehaviorSubject<Users>({user_id:0, sub:''});
  constructor(private http: HttpClient) { }

  login (credentials:LoginRequest):Observable<Users>{
      console.log(credentials);
      return this.http.post<Users>('http://127.0.0.1:8000/login', credentials).pipe(
        tap( (userData: Users) => {
          this.currentUserData.next(userData);
          this.currentUserLoginOn.next(true);
          // console.log(userData.perfil);
      
        }),
        catchError(this.handleError)
      );
  }
  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

  get userData():Observable<Users>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }
  
  public setJWT(data:any){
    localStorage.setItem("jwt",JSON.stringify(data));
  }

  public getJWT(){
    return JSON.parse(localStorage.getItem("jwt")!);
  }

  public clearJWT(){
    this.currentUserLoginOn.next(false);
    this.currentUserData.next({ user_id: 0, sub: '' });
    localStorage.clear();
  }
}
