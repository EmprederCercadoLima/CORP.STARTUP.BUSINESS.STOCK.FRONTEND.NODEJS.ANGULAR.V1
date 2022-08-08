import { Component, OnInit } from '@angular/core';
import { PurchaseRequestService } from 'src/app/services/purchaserequest.service';
import { Router } from '@angular/router'
import { PurchaseRequestStatusEnum } from 'src/app/enums';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.component.html',
  styleUrls: ['./purchase-request.component.css']
})
export class PurchaseRequestComponent implements OnInit {

  public loading: boolean = true;

  public purchaseRequests: any[] = [];
  public totalPurchaseRequests: number = 0;
  public requisitionNumbers: any[] = []

  public page: number = 1;
  public limit: number = 10;

  constructor(
    private readonly authService: AuthService,
    private readonly purchaseRequestService: PurchaseRequestService,
    private readonly router: Router
  ) { 

  }

  ngOnInit(): void {
    this.getPurchaseRequests();
  }

  public getClassStatusTopPurchaseRequest(value: number){
    switch (value) {
      case PurchaseRequestStatusEnum.sent_to_suppliers:
        return 'label label-success';
    
      case PurchaseRequestStatusEnum.with_assigned_quotation:
        return  'label label-info';
    }

    return 'label label-error'
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
        this.purchaseRequests = sucess.purchaseRequests
        this.requisitionNumbers = sucess.purchaseRequests.map((purchaseRequest: any) => purchaseRequest.requisitionNumber)
        this.totalPurchaseRequests = sucess.total
        this.loading = false;
      },
      (error) => {
        console.error("NgxPurchaseRequestComponent::getPurchaseRequests::error", error);
      }
    )
  }

  redirectTo(idPurchaseRequest: string) {
    const ulr = `purchaserequest/${idPurchaseRequest}/info`
    this.router.navigateByUrl(ulr);
  }

}
