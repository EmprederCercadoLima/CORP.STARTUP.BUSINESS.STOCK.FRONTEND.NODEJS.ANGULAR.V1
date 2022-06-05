import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestService {

  private baseEndpoint = '/purchase-requests';

  constructor(private readonly httpClient: HttpClient) { }

  getPurchaseRequestById(idPurchaseRequest: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseEndpoint}/v1.0/${idPurchaseRequest}`).pipe(
      map(response => {
          return response
      }),
      catchError(response => {
          console.error(`${JSON.stringify(PurchaseRequestService.name)}::${this.getPurchaseRequestById.name}::error`, response);
          throw new Error(`${JSON.stringify(PurchaseRequestService.name)}::${this.getPurchaseRequestById.name}::error`);
      })
    )
  }

  postPurchaseRequest(purchaseRequest: any): Observable<any> {
    return this.httpClient.post<any>(this.baseEndpoint + '/v1.0', purchaseRequest).pipe(
      map(response => {
          return response
      }),
      catchError(response => {
          console.error(`${JSON.stringify(PurchaseRequestService.name)}::${this.postPurchaseRequest.name}::error`, response);
          throw new Error(`${JSON.stringify(PurchaseRequestService.name)}::${this.postPurchaseRequest.name}::error`);
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
          throw new Error(`${JSON.stringify(PurchaseRequestService.name)}::${this.patchPurchaseRequest.name}::error`);
      })
    )
  }


}
