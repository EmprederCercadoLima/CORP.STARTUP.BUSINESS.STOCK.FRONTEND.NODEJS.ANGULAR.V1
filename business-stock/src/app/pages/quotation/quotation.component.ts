import { Component, OnInit } from '@angular/core';
import { QuotationStatusEnum } from 'src/app/enums';
import { QuotationService } from 'src/app/services/quotation.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {
  
  public loading: boolean = true;

  public quotations: any[] = [];
  public totalQuotations: number = 0

  public page: number = 1;
  public limit: number = 10;

  constructor(
    private readonly quotationService: QuotationService
  ) { }

  ngOnInit(): void {
    this.getQuotations();
  }

  public getClassStatusQuotation(value: number){
    switch (value) {
      case QuotationStatusEnum.send_to_the_grocery:
        return 'label label-success';
    
      case QuotationStatusEnum.read_by_the_grocery:
        return  'label label-info';
    }

    return 'label label-error'
  }
  
  getQuotations() {
    this.loading = true;

    const pagination = {
      page: this.page,
      limit: this.limit
    }

    this.quotationService.getQuotationPagination(pagination).subscribe(
      (sucess) => {
        this.quotations = sucess.quotations,
        this.totalQuotations = sucess.total
        this.loading = false;
      },
      (error) => {
        console.error("NgxPurchaseRequestComponent::getPurchaseRequests::error", error);
      }
    )
  }

  generatePage(value: number) {

    const pageLimit = Math.floor(this.totalQuotations / this.limit);
    this.page += value;

    if(this.page < 1) {
      this.page = 1;
    } else if(this.page > (pageLimit + 1)) {
      this.page -= value
    }

    this.getQuotations();
  }

  redirectTo(idQuotation: string) {

  }

}
