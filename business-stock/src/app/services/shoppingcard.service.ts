import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {

  private baseEndpoint = '/shopping-cards';

  constructor(private readonly httpClient: HttpClient) { }

  postShoppingCard(request: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseEndpoint}/v1.0/`, request).pipe(
      map(response => {
        return response
      }),
      catchError(response => {
        console.error(`${JSON.stringify(ShoppingCardService.name)}::${this.postShoppingCard.name}::error`, response);
        throw new Error(`${JSON.stringify(ShoppingCardService.name)}::${this.postShoppingCard.name}::error`);
      })
    )
  }

  getShoppingCard(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseEndpoint}/v1.0/`).pipe(
      pluck('data'),
      catchError(response => {
        console.error(`${JSON.stringify(ShoppingCardService.name)}::${this.getShoppingCard.name}::error`, response);
        throw new Error(`${JSON.stringify(ShoppingCardService.name)}::${this.getShoppingCard.name}::error`);
      })
    )
  }

}
