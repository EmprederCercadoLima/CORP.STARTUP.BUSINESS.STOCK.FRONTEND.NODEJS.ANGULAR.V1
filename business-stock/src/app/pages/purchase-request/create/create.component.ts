import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCardService } from 'src/app/services/shoppingcard.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class PurchaseRequestCreateComponent implements OnInit {

  public haveData: boolean = false;

  public categories: any[] = [];
  public idCategory: string = '';

  public products: any[] = []
  public totalProduct = 0;
  public message: string = ''
  public page: number = 1;
  public limit: number = 5;

  protected shoppingCardsPage: any[] = [];
  protected shoppingCards: any[] = [];

  constructor(
    private readonly productService: ProductService,
    private readonly shoppingCardService: ShoppingCardService
  ) { 

  }
  
  ngOnInit(): void {

  }

  loadProducts(products: any[]){
    this.products = products;
    this.haveData = !!(products.length);
  }

  loadTotalProduct(totalProduct: any){
    this.totalProduct = totalProduct;
  }

  loadShoppingCardsPage(products: any[]) {
    console.log("loadShoppingCardsPage", this.shoppingCardsPage);
    this.shoppingCardsPage = products.map((product: any) => {
      return {
        idProduct: product.idProduct,
        quantity: 0,
        isChecked: false
      }
    });
  }
  

  loadIdCategory(idCategory: string) {
    this.idCategory = idCategory;
  }

  getProducts () {

    let query: any = {
      page: this.page,
      limit: this.limit
    }

    if(this.idCategory.length > 0 && this.idCategory != 'null') {
      query["idCategory"] = this.idCategory
    }

    this.productService.paginationProduct(query).subscribe(
      (sucess) => {
        const { products , total } = sucess.data;
        this.products = products;
        this.shoppingCardsPage = products.map((product: any) => {
          return {
            idProduct: product.idProduct,
            quantity: 0,
            isChecked: false
          }
        });
        this.totalProduct = total
      },
      (error) => {
        console.error("NgxProductComponent::getProducts::error", error);
      }
    )
  }

  generatePage(value: number) {

    const pageLimit = Math.floor(this.totalProduct / this.limit);
    this.page += value;

    if(this.page < 1) {
      this.page = 1;
    } else if(this.page > (pageLimit + 1)) {
      this.page -= value
    }

    this.getProducts();
  }

  addProduct(e: any){
    const { checked, value } = e.target;
    const indexProduct: number = this.getFindIndexProduct(value.toString());
    this.shoppingCardsPage[indexProduct].isChecked = checked;
  }

  addQuantity(e: any){
    const { value, id } = e.target;
    const idProduct = id.replace('quantity-', '');
    const indexProduct: number = this.getFindIndexProduct(idProduct.toString());
    this.shoppingCardsPage[indexProduct].quantity = parseInt(value.toString());
  }

  addShorppingCard() {

    const request = this.generateShoppingCard();
    this.shoppingCardService.postShoppingCard(request).subscribe(
      (sucess) => {

      },
      (error) => {
        console.error("NgxProductComponent::addShorppingCard::error", error);
      }
    )
  }

  getFindIndexProduct(idProduct: string) {
    const index = this.shoppingCardsPage.findIndex((product => product.idProduct == idProduct));

    if(index == -1) {
      console.error("NgxPurchaseRequestCreateComponent::getFindIndexProduct::error")
    }

    return index;
  }

  generateShoppingCard() {
    console.log("generateShoppingCard", this.shoppingCardsPage)
    console.log("generateShoppingCard", this.shoppingCards)
    let products = this.shoppingCardsPage.filter(product => product.isChecked)

    for (const product of this.shoppingCards) {
      const exist = products.find(x => x.idProduct.toString() === product.idProduct.toString() )
      if(exist == undefined) {
        products.push({
          idProduct: product.idProduct,
          quantity: product.quantity,
          isChecked: true
        })
      }
    }

    return {
      products
    }
  }

  protected getShoppingCard = () => {
    console.log("getShoppingCard")
    this.shoppingCardService.getShoppingCard().subscribe(
      (sucess) => {
        if(sucess.length)
          this.shoppingCards = sucess[0].products
      },
      (error) => {
        console.error("NgxPurchaseRequestCreateComponent::shoppingCardService::ngOnInit::error", error)
      }
    )
  }


}
