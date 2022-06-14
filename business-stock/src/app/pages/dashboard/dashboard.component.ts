import { Component } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent {

  public loading: boolean = true;

  statistics: any;
  topPurchaseRequests: any[] = [];

  constructor(private readonly dashboardService: DashboardService) { 
    this.loading = true;

    this.dashboardService.topPurchaseRequest({ skip: 1, limit: 10 }).subscribe(
      (sucess) => { 
        this.topPurchaseRequests = sucess.data.purchaseRequests
      },
      (error) => {
        console.error("NgxProductComponent::ngOnInit::topPurchaseRequest::error", error);
      }
    )

    this.dashboardService.totalStatistics().subscribe(
      (sucess) => {
        this.statistics = sucess
        this.loading = false;
      },
      (error) => {
        console.error("NgxProductComponent::ngOnInit::totalStatistics::error", error);
      }
    )
  }



  public getClassStatusTopPurchaseRequest(value: number){
    return (value == 2) ? 'label label-danger' : 'label label-warning'
  }

}
