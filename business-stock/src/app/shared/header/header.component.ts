import { Component, OnInit } from '@angular/core';
import { PurchaseRequestService } from 'src/app/services/purchaserequest.service';
import { ShoppingCardService } from 'src/app/services/shoppingcard.service';

declare function saSuccess(headerMessage: string, headerBody: string): any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  public bodyText: string = '';
  public shoppingCards: any[] = [];
  public products: any[ ] = [];

  constructor(
    private readonly shoppingCardService: ShoppingCardService,
    private readonly purchaseRequestService: PurchaseRequestService
  ) { }

  ngOnInit(): void {
    this.shoppingCardService.getShoppingCard().subscribe(
      (sucess) => {
        this.shoppingCards = sucess
        if(sucess.length)
          this.products = this.shoppingCards[0].products
      },
      (error) => { 
        console.error("NgxHeaderComponent::ngOnInit::error", error);
      }
    )
  }

  generatePurchaseRequest() {
    this.purchaseRequestService.postPurchaseRequest({ 
      idShoppingCard: this.shoppingCards[0]._id,
      deliveryDate: '2020-10-01'
     }).subscribe(
      (sucess) => {
        saSuccess(sucess.message, `Solicitud de compra creado con numero: ${sucess.requisitionNumber}`);
      },
      (error) => { 
        console.error("NgxHeaderComponent::generatePurchaseRequest::error", error);
      }
    )
  }

}
