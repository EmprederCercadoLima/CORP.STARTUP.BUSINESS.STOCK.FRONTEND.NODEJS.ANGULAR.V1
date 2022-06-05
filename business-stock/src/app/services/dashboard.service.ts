import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseEndpoint = '/dashboards';

  constructor(private readonly httpClient: HttpClient) { }


  topPurchaseRequest(pagination: any): Observable<any> {

    let queryParams = new HttpParams();
    
    queryParams.append("page", pagination.page);
    queryParams.append("limit", pagination.limit);

    return this.httpClient.get<any>(this.baseEndpoint + '/v1.0/top-purchase-requests', { params: queryParams } ).pipe(
      map(response => {
          return response
      }),
      catchError(response => {
          console.error(`${JSON.stringify(DashboardService.name)}::${this.topPurchaseRequest.name}::error`, response);
          throw new Error(`${JSON.stringify(DashboardService.name)}::${this.topPurchaseRequest.name}::error`);
      })
    )
  }

  topSupplier(): Observable<any> {
    return this.httpClient.get<any>(this.baseEndpoint + '/v1.0/top-supplier').pipe(
      map(response => {
          return response
      }),
      catchError(response => {
          console.error(`${JSON.stringify(DashboardService.name)}::${this.topSupplier.name}::error`, response);
          throw new Error(`${JSON.stringify(DashboardService.name)}::${this.topSupplier.name}::error`);
      })
    )
  }

}