import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-search',
  templateUrl: './create-search.component.html',
  styleUrls: ['./create-search.component.css']
})
export class PurchaseRequestCreateSearchComponent implements OnInit {

  @Output() outputProducts = new EventEmitter<any[]>();
  @Output() outputTotalProduct = new EventEmitter<any>();
  @Output() outputShoppingCardsPage = new EventEmitter<any[]>();
  @Output() outputIdCategory = new EventEmitter<string>();

  public loading: boolean = true;

  public categories: any[] = [];
  public idCategory: string = '';

  public totalProduct = 0;

  public page: number = 1;
  public limit: number = 5;

  protected shoppingCardsPage: any[] = [];
  protected shoppingCards: any[] = [];

  constructor(
    private readonly productService: ProductService
  ) { 

  }
  
  ngOnInit(): void {
    this.getSetup();
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
        this.outputProducts.emit(products);
        this.outputShoppingCardsPage.emit(products.map((product: any) => {
          return {
            idProduct: product.idProduct,
            quantity: 0,
            isChecked: false
          }
        }));
        this.outputTotalProduct.emit(total);
        this.totalProduct = total;
      },
      (error) => {
        console.error("NgxProductComponent::getProducts::error", error);
      }
    )
  }

  selectedCategory(idCategory: string) {
    this.idCategory = idCategory;
    this.outputIdCategory.emit(idCategory);
  }

  protected getSetup = () => {
    this.productService.getSetup().subscribe(
      (sucess) => { 
        this.categories = sucess.data.categories
      },
      (error) => {
        console.error("NgxPurchaseRequestCreateComponent::productservice::ngOnInit::error", error)
      }
    )
  }

}
