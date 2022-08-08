import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseEndpoint = '/products'

  constructor(private readonly httpClient: HttpClient) { }

  getSetup () {
    return this.httpClient.get<any>(this.baseEndpoint + '/v1.0/setup').pipe(
      pluck('data'),
      catchError(error => this.thowError(error, this.getSetup.name) )
    )
  }

  paginationProduct (pagination: any) {

    let url = `${this.baseEndpoint}/v1.0/${pagination.page}/${pagination.limit}`;

    if(pagination.idCategory) { 
      url = `${url}?idCategory=${pagination.idCategory}`
    }

    return this.httpClient.get<any>(url).pipe(
      map(response => {
          return response
      }),
      catchError(error => this.thowError(error, this.paginationProduct.name) )
    )
  }


  private thowError (error: any, methodName: string): Observable<void> {
    console.error(`${JSON.stringify(ProductService.name)}::${methodName}::error`, error);
    throw new Error(`${JSON.stringify(ProductService.name)}::${methodName}::error`);
  }
}
