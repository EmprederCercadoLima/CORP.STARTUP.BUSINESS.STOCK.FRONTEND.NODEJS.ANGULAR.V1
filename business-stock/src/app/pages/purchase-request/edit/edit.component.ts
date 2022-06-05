import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PurchaseRequestService } from 'src/app/services/purchaserequest.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class PurchaseRequestEditComponent implements OnInit {

  idPurchaseRequest: any;

  constructor(private readonly purchaseRequestService: PurchaseRequestService, private readonly activatedRoute: ActivatedRoute) { 
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

}
