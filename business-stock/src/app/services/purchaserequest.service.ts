import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, delay, map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestService {

  private baseEndpoint = '/purchase-requests';

  constructor(private readonly httpClient: HttpClient) { }

  getPurchaseRequestById(idPurchaseRequest: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseEndpoint}/v1.0/${idPurchaseRequest}`).pipe(
      pluck('data'),
      catchError(response => {
          console.error(`${JSON.stringify(PurchaseRequestService.name)}::${this.getPurchaseRequestById.name}::error`, response);
          return throwError(response);
      })
    )
  }

  getPurchaseRequest(pagination: any): Observable<any> {
    let url = `${this.baseEndpoint}/v1.0/${pagination.page}/${pagination.limit}`;
    return this.httpClient.get<any>(url).pipe(
      pluck('data'),
      catchError(response => {
          console.error(`${JSON.stringify(PurchaseRequestService.name)}::${this.getPurchaseRequest.name}::error`, response);
          return throwError(response);
      })
    )
  }

  postPurchaseRequest(purchaseRequest: any): Observable<any> {
    return this.httpClient.post<any>(this.baseEndpoint + '/v1.0', purchaseRequest).pipe(
      pluck('data'),
      catchError(response => {
          console.error(`${JSON.stringify(PurchaseRequestService.name)}::${this.postPurchaseRequest.name}::error`, response);
          return throwError(response);
      })
    )
  }

  patchPurchaseRequest(purchaseRequest: any): Observable<any> {
    return this.httpClient.patch<any>(this.baseEndpoint + '/v1.0', purchaseRequest).pipe(
      map(response => {
          return response
      }),
      catchError(response => {
          console.error(`${JSON.stringify(PurchaseRequestService.name)}::${this.patchPurchaseRequest.name}::error`, response);
          return throwError(response);
      })
    )
  }



}
