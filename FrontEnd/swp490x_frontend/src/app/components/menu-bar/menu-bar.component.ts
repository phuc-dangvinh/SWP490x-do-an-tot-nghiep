import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  items: MenuItem[] = [];
  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
      },
      {
        label: 'Admin',
        icon: 'pi pi-fw pi-key',
        items: [
          {
            label: 'Management',
            items: [
              {
                label: 'User',
                routerLink: ['admin/user-management'],
              },
              {
                label: 'Category',
                routerLink: ['admin/category-management'],
              },
              {
                label: 'Product',
                routerLink: ['admin/product-management'],
              },
            ],
          },
        ],
      },
      {
        label: 'Cart',
        icon: 'pi pi-fw pi-shopping-cart',
        // items: []
      },
      {
        label: 'Account',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'My account',
          },
          {
            label: 'Sign in',
          },
          {
            label: 'Sign out',
          },
        ],
      },
    ];
  }
}
