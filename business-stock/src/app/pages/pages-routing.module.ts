import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PagesComponent } from "./pages.component";
import { PurchaseOrderComponent } from "./purchase-order/purchase-order.component";
import { PurchaseRequestComponent } from "./purchase-request/purchase-request.component";
import { QuotationComponent } from "./quotation/quotation.component";
import { PurchaseRequestCreateComponent } from "./purchase-request/create/create.component";
import { QuotationCreateComponent } from "./quotation/create/create.component";

const routes : Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'purchaseorder', component: PurchaseOrderComponent },
          { 
                path: 'purchaserequest',
                children: [
                    { path: '', component: PurchaseRequestComponent },
                    { path: 'create', component: PurchaseRequestCreateComponent }
                ]
            },
          { 
                path: 'quotation',
                children: [
                    { path: '', component: QuotationComponent },
                    { path: 'create', component: QuotationCreateComponent }
                ] 
           },
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    },
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {

}