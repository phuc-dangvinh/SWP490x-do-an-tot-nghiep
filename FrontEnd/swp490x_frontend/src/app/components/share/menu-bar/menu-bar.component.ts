import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/interface/menu-item';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  public menuItems: MenuItem[] = [];
  ngOnInit(): void {
    this.menuItems = [
      { name: 'Home', icon: 'bi-house', routerLink: '/home' },
      {
        name: 'Management',
        icon: 'bi-sliders2',
        subItems: [
          { name: 'User', routerLink: '/admin/user-management' },
          { name: 'Product', routerLink: '/admin/product-management' },
          { name: 'Category', routerLink: '/admin/category-management' },
        ],
      },
      { name: 'Cart', icon: 'bi-cart', routerLink: '' },
      {
        name: 'Account',
        icon: 'bi-person',
        subItems: [
          { name: 'My profile', routerLink: '' },
          { name: 'Sign in', routerLink: '/account/sign-in' },
          { name: 'Sign up', routerLink: '/account/sign-up' },
          { name: 'Sign out', routerLink: '' },
        ],
      },
    ];
  }
}
