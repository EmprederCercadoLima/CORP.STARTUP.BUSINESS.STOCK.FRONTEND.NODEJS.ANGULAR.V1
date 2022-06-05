import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [{
    title: 'Dashboard',
    icon: 'mdi mdi-gauge',
    url: ''
  },
  {
    title: 'PurchaseRequest',
    icon: 'mdi mdi-gauge',
    url: 'purchaserequest',
    subMenu: [{
      title: 'Crear', url: 'purchaserequest/create'
    }]
  },
  {
    title: 'Quotation',
    icon: 'mdi mdi-gauge',
    url: 'quotation',
    subMenu: [{
      title: 'Crear', url: 'quotation/create'
    }]
  },
  {
    title: 'PurchaseOrder',
    icon: 'mdi mdi-gauge',
    url: 'purchaseorder'
  }]

  constructor() { }



}
