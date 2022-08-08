import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Profile } from 'src/app/enums';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseRequestService } from 'src/app/services/purchaserequest.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class PurchaseRequestInfoComponent implements OnInit {

  
  public idPurchaseRequest: any;
  public purchaseRequest: any;
  public isSupplier: boolean = false;

  constructor(
    private readonly purchaseRequestService: PurchaseRequestService,
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { 
  }


  ngOnInit(): void {

    const { profile } = this.authService.getDecodeToken();
    this.isSupplier = !!(profile == Profile.supplier);

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.idPurchaseRequest = params.get('id');
    });


    this.purchaseRequestService.getPurchaseRequestById(this.idPurchaseRequest).subscribe(
      (sucess) => { 
        this.purchaseRequest = sucess;
        this.purchaseRequest.deliveryDate = this.purchaseRequest.deliveryDate.slice(0, 10)
      },
      (failed) => { 
        console.error("NgxPurchaseRequestEditComponent::ngOnInit::error", failed)
      } 
    )
    
  }

  redirectTo () {
    const ulr = `purchaserequest/`
    this.router.navigateByUrl(ulr);
  }

  redirectoToCreateQuotation () {
    const ulr = `quotation/${this.idPurchaseRequest}/create`
    this.router.navigateByUrl(ulr);

  }

}
