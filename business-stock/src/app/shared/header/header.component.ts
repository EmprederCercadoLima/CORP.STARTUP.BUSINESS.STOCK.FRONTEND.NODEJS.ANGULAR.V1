import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/enums';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseRequestService } from 'src/app/services/purchaserequest.service';
import { ShoppingCardService } from 'src/app/services/shoppingcard.service';

declare function saSuccess(headerMessage: string, headerBody: string, redirectTo: string): any;

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
  public haveShoppingCards: boolean = false;
  public user: any;
  public typeAdmin: string = '';
  constructor(
    private readonly shoppingCardService: ShoppingCardService,
    private readonly purchaseRequestService: PurchaseRequestService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getDecodeToken();
    this.typeAdmin = (this.user.profile == Profile.client) ? 'Cliente' : (this.user.profile == Profile.supplier) ? 'Proveedor' : 'Administrador Sistema'
    if(this.user.profile == Profile.client) {
      this.shoppingCardService.getShoppingCard().subscribe(
        (sucess) => {
          this.shoppingCards = sucess
          if(sucess.length) {
            this.haveShoppingCards = true;
            this.products = this.shoppingCards[0].products
          }
        },
        (error) => { 
          console.error("NgxHeaderComponent::ngOnInit::error", error);
        }
      )
    }
  }

  logout() {
    const token = localStorage.getItem("token");
    this.authService.postLogout({ token }).subscribe(
      (sucess) => {
        this.router.navigateByUrl('/login');
      },
      (failed) => {
        console.error("NgxHeaderComponent::logout::error", failed);
      }
    )
  }

  generatePurchaseRequest() {
    this.purchaseRequestService.postPurchaseRequest({ 
      idShoppingCard: this.shoppingCards[0]._id,
      deliveryDate: '2020-10-01'
     }).subscribe(
      (sucess) => {
        saSuccess(
          sucess.message, 
          `Solicitud de compra creado con numero: ${sucess.requisitionNumber}`,
          './purchaserequest'
        );
      },
      (error) => { 
        console.error("NgxHeaderComponent::generatePurchaseRequest::error", error);
      }
    )
  }

}
