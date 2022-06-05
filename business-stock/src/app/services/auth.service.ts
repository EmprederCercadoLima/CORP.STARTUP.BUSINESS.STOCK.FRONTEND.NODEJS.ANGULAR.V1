import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";

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
            console.error(`${JSON.stringify(AuthService.name)}::${this.postLogin.name}::error`, response);
            throw new Error(`${JSON.stringify(AuthService.name)}::${this.postLogin.name}::error`);
        })
    )
  }

  isLoggedIn(): boolean {
      return !!localStorage.getItem('loggedIn');
  }
}
