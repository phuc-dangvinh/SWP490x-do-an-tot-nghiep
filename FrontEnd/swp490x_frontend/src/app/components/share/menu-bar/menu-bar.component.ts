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
      { name: 'Home', icon: 'bi-house', routerLink: '' },
      {
        name: 'Admin',
        icon: 'bi-sliders2',
        subMenu: [
          {
            name: 'Management',
            subMenu: [
              { name: 'User', routerLink: '' },
              { name: 'Product', routerLink: '' },
              { name: 'Category', routerLink: '' },
            ],
          },
        ],
      },
      { name: 'Cart', icon: 'bi-cart', routerLink: '' },
      {
        name: 'Account',
        icon: 'bi-person',
        subMenu: [
          {
            name: 'Management',
            subMenu: [
              { name: 'My profile', routerLink: '' },
              { name: 'Sign in', routerLink: '' },
              { name: 'Sign up', routerLink: '' },
              { name: 'Sign out', routerLink: '' },
            ],
          },
        ],
      },
    ];
  }
}
