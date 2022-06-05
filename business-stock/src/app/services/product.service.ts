import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseEndpoint = '/products'

  constructor(private readonly httpClient: HttpClient) { }

  paginationProduct (pagination: any) {

    let queryParams = new HttpParams();
    
    queryParams.append("page", pagination.page);
    queryParams.append("limit", pagination.limit);

    if(pagination.idCategory) queryParams.append("idCategory", pagination.idCategory);
    if(pagination.keywords) queryParams.append("keywords", pagination.keywords);

    return this.httpClient.get<any>(this.baseEndpoint + '/v1.0', { params: queryParams }).pipe(
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
