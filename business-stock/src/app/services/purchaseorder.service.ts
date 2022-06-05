import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  baseEndpoint = '/purchase-orders';

  constructor(private readonly httpClient: HttpClient) { }

  postPurchaseOrder(purchaseOrder: any): Observable<any> {
    return this.httpClient.post<any>(this.baseEndpoint + '/v1.0', purchaseOrder).pipe(
      map(response => {
          return response
      }),
      catchError(response => {
          console.error(`${JSON.stringify(PurchaseOrderService.name)}::${this.postPurchaseOrder.name}::error`, response);
          throw new Error(`${JSON.stringify(PurchaseOrderService.name)}::${this.postPurchaseOrder.name}::error`);
      })
    )
  }

  patchPurchaseOrder(purchaseOrder: any): Observable<any> {
    return this.httpClient.patch<any>(this.baseEndpoint + '/v1.0', purchaseOrder).pipe(
      map(response => {
          return response
      }),
      catchError(response => {
          console.error(`${JSON.stringify(PurchaseOrderService.name)}::${this.patchPurchaseOrder.name}::error`, response);
          throw new Error(`${JSON.stringify(PurchaseOrderService.name)}::${this.patchPurchaseOrder.name}::error`);
      })
    )
  }


}
