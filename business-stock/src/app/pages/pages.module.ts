import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { PurchaseRequestComponent } from './purchase-request/purchase-request.component';
import { QuotationComponent } from './quotation/quotation.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { PurchaseRequestCreateComponent } from './purchase-request/create/create.component';
import { QuotationCreateComponent } from './quotation/create/create.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PurchaseOrderComponent,
    PurchaseRequestComponent,
    QuotationComponent,
    PagesComponent,
    PurchaseRequestCreateComponent,
    QuotationCreateComponent
  ],
  exports: [
    DashboardComponent,
    PurchaseOrderComponent,
    PurchaseRequestComponent,
    QuotationComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class PagesModule { }
