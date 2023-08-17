import { Component, OnInit } from '@angular/core';
import { GroupMenu, MenuItem } from 'src/app/interface/menu-item';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  public menuItems: MenuItem[] = [];
  ngOnInit(): void {
    this.menuItems = [
      {
        group: GroupMenu.HOME,
        name: 'Home',
        icon: 'bi-house',
        routerLink: '/home',
        mainItem: true,
        display: true,
      },
      {
        group: GroupMenu.MANAGEMENT,
        name: 'Management',
        icon: 'bi-sliders2',
        mainItem: true,
        display: true,
      },
      {
        group: GroupMenu.MANAGEMENT,
        name: 'User',
        routerLink: '/admin/user-management',
        mainItem: false,
        display: true,
      },
      {
        group: GroupMenu.MANAGEMENT,
        name: 'Product',
        routerLink: '/admin/product-management',
        mainItem: false,
        display: true,
      },
      {
        group: GroupMenu.MANAGEMENT,
        name: 'Category',
        routerLink: '/admin/category-management',
        mainItem: false,
        display: true,
      },
      {
        group: GroupMenu.CART,
        name: 'Cart',
        icon: 'bi-cart',
        routerLink: '',
        mainItem: true,
        display: true,
      },
      {
        group: GroupMenu.ACCOUNT,
        name: 'Account',
        icon: 'bi-person',
        mainItem: true,
        display: true,
      },
      {
        group: GroupMenu.ACCOUNT,
        name: '',
        icon: 'bi-person',
        mainItem: true,
        display: false,
      },
      {
        group: GroupMenu.ACCOUNT,
        name: 'My profile',
        routerLink: '',
        mainItem: false,
        display: true,
      },
      {
        group: GroupMenu.ACCOUNT,
        name: 'Sign in',
        routerLink: '/account/sign-in',
        mainItem: false,
        display: true,
      },
      {
        group: GroupMenu.ACCOUNT,
        name: 'Sign up',
        routerLink: '/account/sign-up',
        mainItem: false,
        display: true,
      },
      {
        group: GroupMenu.ACCOUNT,
        name: 'Sign out',
        routerLink: '',
        mainItem: false,
        display: true,
      },
    ];
  }

  get mainItems() {
    return this.menuItems.filter((item) => item.mainItem && item.display);
  }

  public getSubItems(groupMenu: GroupMenu) {
    return this.menuItems.filter(
      (item) => item.group == groupMenu && !item.mainItem && item.display
    );
  }

  private getItem(name: string) {
    return this.menuItems.find((item) => item.name == name);
  }
}
