import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseEndpoint = '/products'

  constructor(private readonly httpClient: HttpClient) { }

  getSetup () {
    return this.httpClient.get<any>(this.baseEndpoint + '/v1.0/setup').pipe(
      map(response => {
        return response
      }),
      catchError(response => {
        console.error(`${JSON.stringify(ProductService.name)}::${this.getSetup.name}::error`, response);
        throw new Error(`${JSON.stringify(ProductService.name)}::${this.getSetup.name}::error`);
    })
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
      catchError(response => {
          console.error(`${JSON.stringify(ProductService.name)}::${this.paginationProduct.name}::error`, response);
          throw new Error(`${JSON.stringify(ProductService.name)}::${this.paginationProduct.name}::error`);
      })
    )
  }

}
