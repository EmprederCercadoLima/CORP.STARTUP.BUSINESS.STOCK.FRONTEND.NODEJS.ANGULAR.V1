import { Component, OnInit } from '@angular/core';
import { PurchaseRequestService } from 'src/app/services/purchaserequest.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.component.html',
  styleUrls: ['./purchase-request.component.css']
})
export class PurchaseRequestComponent implements OnInit {

  public loading: boolean = true;

  purchaseRequests: any[] = []
  totalPurchaseRequests: number = 0;

  public page: number = 1;
  public limit: number = 10;

  constructor(
    private readonly purchaseRequestService: PurchaseRequestService,
    private readonly router: Router
  ) { 

  }

  ngOnInit(): void {
    this.getPurchaseRequests();
  }

  public getClassStatusTopPurchaseRequest(value: number){
    return (value == 2) ? 'label label-danger' : 'label label-warning'
  }

  generatePage(value: number) {

    const pageLimit = Math.floor(this.totalPurchaseRequests / this.limit);
    this.page += value;

    if(this.page < 1) {
      this.page = 1;
    } else if(this.page > (pageLimit + 1)) {
      this.page -= value
    }

    this.getPurchaseRequests();
  }

  getPurchaseRequests() {
    this.loading = true;

    const pagination = {
      page: this.page,
      limit: this.limit
    }

    this.purchaseRequestService.getPurchaseRequest(pagination).subscribe(
      (sucess) => {
        this.purchaseRequests = sucess.purchaseRequests,
        this.totalPurchaseRequests = sucess.total
        this.loading = false;
      },
      (error) => {

      }
    )
  }

  redirectTo(idPurchaseRequest: string, value: number) {
    console.log("idPurchaseRequests", idPurchaseRequest, value)

    const ulr = (value === 1) ? `purchaserequest/${idPurchaseRequest}/edit` : `${idPurchaseRequest}/info`
    this.router.navigateByUrl(ulr);

  }

}
