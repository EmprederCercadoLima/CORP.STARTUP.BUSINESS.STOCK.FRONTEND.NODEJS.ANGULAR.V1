import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PurchaseRequestService } from 'src/app/services/purchaserequest.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class PurchaseRequestInfoComponent implements OnInit {

  idPurchaseRequest: any;

  constructor(
    private readonly purchaseRequestService: PurchaseRequestService, 
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { 
    
  }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.idPurchaseRequest = params.get('id');
    });

    this.purchaseRequestService.getPurchaseRequestById(this.idPurchaseRequest).subscribe(
      (sucess) => { console.log("SUCESS", sucess); },
      (failed) => { console.log("FAILED", failed); } 
    )

  }

  public buttonNavigationToEditPurchaseRequest() {
    this.router.navigateByUrl(`purchaserequest/${this.idPurchaseRequest}/edit`);
  }

}
