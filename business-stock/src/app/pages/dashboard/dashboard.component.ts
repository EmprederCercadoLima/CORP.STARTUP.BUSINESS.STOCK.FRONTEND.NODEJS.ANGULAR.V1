import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  topPurchaseRequests: any[] = [];

  constructor(private readonly dashboardService: DashboardService) { }

  ngOnInit(): void {
    
    this.dashboardService.topPurchaseRequest({ skip: 1, limit: 10 }).subscribe(
      (sucess) => { 
        this.topPurchaseRequests = sucess.data.purchaseRequests
      },
      (failed) => {console.log("failed", failed)}
    )

  }

  public getClassStatusTopPurchaseRequest(value: number){
    return (value == 2) ? 'label label-danger' : 'label label-warning'
 
 }

}
