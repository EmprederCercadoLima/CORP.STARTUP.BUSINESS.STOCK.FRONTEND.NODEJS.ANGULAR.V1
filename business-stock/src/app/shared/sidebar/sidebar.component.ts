import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsEnum, Profile } from 'src/app/enums';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[] = [];

  constructor(
    private readonly sideBarService: SidebarService,
    private readonly authService: AuthService,
    private readonly router: Router  
  ) { 
    //this.menuItems = this.sideBarService.menu
  }

  ngOnInit(): void {
    const { permissions, profile } = this.authService.getDecodeToken();
    this.generateMenu(permissions, profile);
  }


  redirectTo(url: string) {
    this.router.navigateByUrl(url);
  }

  generateMenu(permissions: any[], profile: any): any {

    const permissionsEnumArray = Object.values(PermissionsEnum);

    for (const permissionEnum of permissionsEnumArray) {
      const exist = !!permissions.find(permission => permission === permissionEnum)
      if(exist) {
        if(profile == Profile.client) {
          this.generateMenuForClient(permissionEnum)
        } else if (profile == Profile.supplier) {
          this.generateMenuForSupplier(permissionEnum)
        } else {
          this.generateMenuForAdminSystem(permissionEnum)
        }
      }
    }

  }

  generateMenuForAdminSystem = (permissionEnum: string) => {
    switch (permissionEnum) {
      case PermissionsEnum.DASHBOARD_READ:
        this.menuItems.push({
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          url: ''
        })
        break;
      
      case PermissionsEnum.PURCHASE_REQUEST_READ:
        this.menuItems.push({
          title: 'PurchaseRequest',
          icon: 'mdi mdi-gauge',
          url: 'purchaserequest',
        })
        break;
      case PermissionsEnum.PURCHASE_ORDER_READ:
        this.menuItems.push({
          title: 'PurchaseOrder',
          icon: 'mdi mdi-gauge',
          url: 'purchaseorder'
        })
        break;
      case PermissionsEnum.QUOTATION_READ:
        this.menuItems.push({
          title: 'Quotation',
          icon: 'mdi mdi-gauge',
          url: 'quotation'
        })
        break;
      case PermissionsEnum.PRODUCT_WRITE:
        this.menuItems.push({
          title: 'Manage',
          icon: 'mdi mdi-folder-lock-open',
          subMenu: [{
            title: 'Product', url: 'product'
          }]
        })
        break;
      
      default:
        break;
    }
  }

  generateMenuForSupplier = (permissionEnum: string) => {
    switch (permissionEnum) {
      case PermissionsEnum.DASHBOARD_READ:
        this.menuItems.push({
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          url: ''
        })
        break;
      
      case PermissionsEnum.PURCHASE_REQUEST_READ:
        this.menuItems.push({
          title: 'PurchaseRequest',
          icon: 'mdi mdi-gauge',
          url: 'purchaserequest'
        })
        break;
      case PermissionsEnum.PURCHASE_ORDER_READ:
        this.menuItems.push({
          title: 'PurchaseOrder',
          icon: 'mdi mdi-gauge',
          url: 'purchaseorder'
        })
        break;
      case PermissionsEnum.QUOTATION_READ:
        this.menuItems.push({
          title: 'Quotation',
          icon: 'mdi mdi-gauge',
          url: 'quotation',
          subMenu: [{
            title: 'Crear', url: 'quotation/create'
          }]
        })
        break;
      
      default:
        break;
      
    }
  }

  generateMenuForClient = (permissionEnum: string) => {
    switch (permissionEnum) {
      case PermissionsEnum.DASHBOARD_READ:
        this.menuItems.push({
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          url: ''
        })
        break;
      
      case PermissionsEnum.PURCHASE_REQUEST_READ:
        this.menuItems.push({
          title: 'PurchaseRequest',
          icon: 'mdi mdi-gauge',
          url: 'purchaserequest',
          subMenu: [{
            title: 'Crear', url: 'purchaserequest/create'
          }]
        })
        break;
      case PermissionsEnum.PURCHASE_ORDER_READ:
        this.menuItems.push({
          title: 'PurchaseOrder',
          icon: 'mdi mdi-gauge',
          url: 'purchaseorder'
        })
        break;
      case PermissionsEnum.QUOTATION_READ:
        this.menuItems.push({
          title: 'Quotation',
          icon: 'mdi mdi-gauge',
          url: 'quotation'
        })
        break;
      
      default:
        break;
      
    }
  }

}
