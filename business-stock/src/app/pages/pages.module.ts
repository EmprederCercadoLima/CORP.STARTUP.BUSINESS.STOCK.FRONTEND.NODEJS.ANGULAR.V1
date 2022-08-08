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
import { QuotationEditComponent } from './quotation/edit/edit.component';
import { PurchaseRequestInfoComponent } from './purchase-request/info/info.component';
import { QuotationInfoComponent } from './quotation/info/info.component';
import { ProductComponent } from './manage/product/product.component';
import { FormsModule } from '@angular/forms';
import { PurchaseRequestCreateSearchComponent } from './purchase-request/create/search/create-search.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PurchaseOrderComponent,
    PurchaseRequestComponent,
    PurchaseRequestInfoComponent,
    PurchaseRequestCreateComponent,
    PurchaseRequestCreateSearchComponent,
    QuotationComponent,
    PagesComponent,
    QuotationCreateComponent,
    QuotationEditComponent,
    QuotationInfoComponent,
    ProductComponent,
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
    AppRoutingModule,
    FormsModule,
  ]
})
export class PagesModule { }
