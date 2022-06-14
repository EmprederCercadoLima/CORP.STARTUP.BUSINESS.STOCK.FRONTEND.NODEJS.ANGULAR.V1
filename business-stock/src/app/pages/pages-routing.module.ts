import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PagesComponent } from "./pages.component";
import { PurchaseOrderComponent } from "./purchase-order/purchase-order.component";
import { PurchaseRequestComponent } from "./purchase-request/purchase-request.component";
import { QuotationComponent } from "./quotation/quotation.component";
import { PurchaseRequestCreateComponent } from "./purchase-request/create/create.component";
import { QuotationCreateComponent } from "./quotation/create/create.component";
import { PurchaseRequestEditComponent } from "./purchase-request/edit/edit.component";
import { QuotationEditComponent } from "./quotation/edit/edit.component";
import { PurchaseRequestInfoComponent } from "./purchase-request/info/info.component";
import { QuotationInfoComponent } from "./quotation/info/info.component";
import { AuthGuard } from "../guards/auth.guard";
import { ProductComponent } from "./manage/product/product.component";

const routes : Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full', data: { title: 'Dashboard' } },
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'purchaseorder', component: PurchaseOrderComponent, data: { title: 'Orden de compra' } },
            { 
                path: 'purchaserequest',
                data: { title: 'Solicitud de compra' },
                children: [
                    { path: '', component: PurchaseRequestComponent },
                    { path: ':id/edit', component: PurchaseRequestEditComponent },
                    { path: ':id/info', component: PurchaseRequestInfoComponent },
                    { path: 'create', component: PurchaseRequestCreateComponent }
                ]
            },
            { path: 'purchaserequest/:id', component: PurchaseRequestInfoComponent },
            { 
                path: 'quotation',
                data: { title: 'Cotizacion' },
                children: [
                    { path: '', component: QuotationComponent },
                    { path: ':id/edit', component: QuotationEditComponent },
                    { path: 'create', component: QuotationCreateComponent }
                ] 
            },
            { path: 'quotation/:id', component: QuotationInfoComponent },
            { path: 'product', component: ProductComponent }
        ]
    },
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {

}