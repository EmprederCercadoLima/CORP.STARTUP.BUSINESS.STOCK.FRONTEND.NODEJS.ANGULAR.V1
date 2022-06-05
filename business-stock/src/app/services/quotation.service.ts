import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  baseEndpoint = '/quotations';

  constructor(private readonly httpClient: HttpClient) { }

  postQuotation(quotation: any): Observable<any> {
    return this.httpClient.post<any>(this.baseEndpoint + '/v1.0', quotation).pipe(
      map(response => {
          return response
      }),
      catchError(response => {
          console.error(`${JSON.stringify(QuotationService.name)}::${this.postQuotation.name}::error`, response);
          throw new Error(`${JSON.stringify(QuotationService.name)}::${this.postQuotation.name}::error`);
      })
    )
  }

  patchQuotation(quotation: any): Observable<any> {
    return this.httpClient.patch<any>(this.baseEndpoint + '/v1.0', quotation).pipe(
      map(response => {
          return response
      }),
      catchError(response => {
          console.error(`${JSON.stringify(QuotationService.name)}::${this.patchQuotation.name}::error`, response);
          throw new Error(`${JSON.stringify(QuotationService.name)}::${this.patchQuotation.name}::error`);
      })
    )
  }


}
