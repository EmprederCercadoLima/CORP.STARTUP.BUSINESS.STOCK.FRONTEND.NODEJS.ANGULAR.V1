import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PurchaseRequestService } from 'src/app/services/purchaserequest.service';
import { QuotationService } from 'src/app/services/quotation.service';


declare function saSuccess(headerMessage: string, headerBody: string, redirectTo: string): any;
declare function saWarning(headerMessage: string, headerBody: string): any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class QuotationCreateComponent implements OnInit {

  public idPurchaseRequest: any = '';
  public purchaseRequest: any;

  private quotation: any = {
    idPurchaseRequest : '',
    products : []
  };

  constructor(
    private readonly purchaseRequestService: PurchaseRequestService,
    private readonly quotationService: QuotationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.idPurchaseRequest = params.get('id');
      this.quotation.idPurchaseRequest = this.idPurchaseRequest;
    });

    this.purchaseRequestService.getPurchaseRequestById(this.idPurchaseRequest).subscribe(
      (sucess) => { 
        this.purchaseRequest = sucess;
        this.quotation.products = this.purchaseRequest.products.map((product: { idProduct: any; }) => {
          return {
            idProduct: product.idProduct,
            price: 0
          }
        })
        this.purchaseRequest.deliveryDate = this.purchaseRequest.deliveryDate.slice(0, 10)
      },
      (error) => { 
        console.error("NgxQuotationCreateComponent::ngOnInit::error", error)
      } 
    )

  }

  generateQuotation() {

    const isNotValid = this.quotation.products.find((product: { price: number; }) => product.price == 0);

    if(!(!!isNotValid)) {
      this.quotationService.postQuotation(this.quotation).subscribe(
        (sucess) => {
          saSuccess(
            sucess.message, 
            `Cotizacion de compra creado con numero: ${sucess.quotationNumber}`,
            './quotation'
          );
        },
        (failed) => {
          const { error } = failed;
          saWarning(
            'Tenemos un problema', 
            `${error.message}`
          );
          console.error("NgxQuotationCreateComponent::generateQuotation::error", failed)
        }
      )
    } else {
      saWarning(
        'Cotizacion errada', 
        `Todos los items de productos deben tener un precio establecido`
      );
    }
  }

  addPrice(e: any) {
    const { value, id } = e.target;
    const idProduct = id.replace('quantity-', '');

    const product = this.quotation.products.find((product: { idProduct: any; }) => product.idProduct == idProduct )

    if(!!product) {
      product.price = parseFloat(value)
    }

  }
}
