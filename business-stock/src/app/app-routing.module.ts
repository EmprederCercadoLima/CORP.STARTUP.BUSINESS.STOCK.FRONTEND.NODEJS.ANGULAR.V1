import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PagesComponent } from './pages/pages.component';
import { PurchaseOrderComponent } from './pages/purchase-order/purchase-order.component';
import { PurchaseRequestComponent } from './pages/purchase-request/purchase-request.component';
import { QuotationComponent } from './pages/quotation/quotation.component';

const routes: Routes = [
  
    {
      path: '',
      component: PagesComponent,
      children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'purchaseorder', component: PurchaseOrderComponent },
        { path: 'purchaserequest', component: PurchaseRequestComponent },
        { path: 'quotation', component: QuotationComponent },
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      ]
    },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
