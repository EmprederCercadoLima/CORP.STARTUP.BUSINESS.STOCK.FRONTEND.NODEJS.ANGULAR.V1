import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseEndpoint = '/authentications';

  constructor(private readonly httpClient: HttpClient) { }

  getHashes() : Observable<any>{
    return this.httpClient.get<any>(this.baseEndpoint + '/v1.0/hash')
  }

  postLogin(postLogin: any): Observable<any> {
    return this.httpClient.post<any>(this.baseEndpoint + '/v1.0/login', postLogin).pipe(
        map(response => {
            localStorage.setItem('token', response.data);
            localStorage.setItem('loggedIn', 'true');
            return response
        }),
        catchError(response => {
            localStorage.removeItem('token');
            localStorage.removeItem('loggedIn');
            console.error(`${AuthService.name}::${this.postLogin.name}::error`, response.error);
            return throwError(response);
        })
    )
  }

  postLogout(postLogout: any) : Observable<any> {
    return this.httpClient.post<any>(this.baseEndpoint + '/v1.0/logout', postLogout).pipe(
      map(response => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedIn');
          return response
      }),
      catchError(response => {
          console.error(`${AuthService.name}::${this.postLogin.name}::error`, response.error);
          return throwError(response);
      })
  )
  }

  isLoggedIn(): boolean {
      return !!localStorage.getItem('loggedIn');
  }

  getDecodeToken(): any {
    if(!this.isLoggedIn()) {
      return throwError(`${AuthService.name}::${this.getDecodeToken.name}::error`);
    }

    const token = localStorage.getItem("token");
    const decodeToken = jwtDecode( (token == null) ? '' : token )
    return decodeToken;
  }

}
