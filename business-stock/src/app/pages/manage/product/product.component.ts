import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products: any[] = []
  public totalProduct = 0;

  public page: number = 1;
  public limit: number = 5;

  public loading: boolean = true;

  constructor(
    private readonly productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProduct();
  }


  loadProduct() {
    this.loading = true;

    this.productService.paginationProduct({ page: this.page, limit: this.limit }).subscribe(
      (sucess) => {
        this.products = sucess.data.products
        this.totalProduct = sucess.data.total
        this.loading = false;
      },
      (error) => {
        console.error("NgxProductComponent::ngOnInit::error", error);
        this.loading = false;
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

    this.loadProduct();
  }

  getClassStatusProduct(value: number) {
    return (value == 1) ? 'label label-info' : 'label label-danger'
  }
}
