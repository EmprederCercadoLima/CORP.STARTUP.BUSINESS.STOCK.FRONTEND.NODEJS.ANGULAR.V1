import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  baseEndpoint = '/quotations';

  constructor(private readonly httpClient: HttpClient) { }

  postQuotation(quotation: any): Observable<any> {
    return this.httpClient.post<any>(this.baseEndpoint + '/v1.0', quotation).pipe(
      pluck('data'),
      catchError(response => {
        console.error(`${QuotationService.name}::${this.postQuotation.name}::error`, response.error);
        return throwError(response);
      })
    )
  }

  patchQuotation(quotation: any): Observable<any> {
    return this.httpClient.patch<any>(this.baseEndpoint + '/v1.0', quotation).pipe(
      map(response => {
          return response
      }),
      catchError(response => {
        console.error(`${QuotationService.name}::${this.patchQuotation.name}::error`, response.error);
        return throwError(response);
      })
    )
  }

  getQuotationPagination(pagination: any): Observable<any> {
    let url = `${this.baseEndpoint}/v1.0/${pagination.page}/${pagination.limit}`;
    return this.httpClient.get<any>(url).pipe(
      pluck('data'),
      catchError(response => {
          console.error(`${JSON.stringify(QuotationService.name)}::${this.getQuotationPagination.name}::error`, response);
          return throwError(response);
      })
    )
  }


}
