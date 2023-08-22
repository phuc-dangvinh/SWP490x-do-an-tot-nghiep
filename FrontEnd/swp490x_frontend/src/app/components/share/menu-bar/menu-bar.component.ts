import { Component, OnInit } from '@angular/core';
import { ROLE } from 'src/app/const/ERole';
import { rootApi } from 'src/app/enviroments/environment';
import { GroupMenu, ItemMenuName, MenuItem } from 'src/app/interface/menu-item';
import { ESessionKeyCredentials } from 'src/app/interface/session-key-credentials.enum';
import { User } from 'src/app/interface/user';
import { SessionStorageService } from 'src/app/service/session-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  private isAdminUser: boolean = false;
  public currentUser!: User;
  // private unsubscribe$: Subject<void> = new Subject<void>();
  private menuItems: MenuItem[] = [
    {
      group: GroupMenu.HOME,
      name: ItemMenuName.HOME,
      icon: 'bi-house',
      routerLink: '/home',
      mainItem: true,
      display: true,
    },
    {
      group: GroupMenu.MANAGEMENT,
      name: ItemMenuName.MANAGEMENT,
      icon: 'bi-sliders2',
      mainItem: true,
      display: false,
    },
    {
      group: GroupMenu.MANAGEMENT,
      name: ItemMenuName.USER,
      routerLink: '/admin/user-management',
      mainItem: false,
      display: true,
    },
    {
      group: GroupMenu.MANAGEMENT,
      name: ItemMenuName.PRODUCT,
      routerLink: '/admin/product-management',
      mainItem: false,
      display: true,
    },
    {
      group: GroupMenu.MANAGEMENT,
      name: ItemMenuName.CATEGORY,
      routerLink: '/admin/category-management',
      mainItem: false,
      display: true,
    },
    {
      group: GroupMenu.CART,
      name: ItemMenuName.CART,
      icon: 'bi-cart',
      routerLink: '',
      mainItem: true,
      display: true,
    },
    {
      group: GroupMenu.ACCOUNT,
      name: ItemMenuName.ACCOUNT,
      icon: 'bi-person',
      mainItem: true,
      display: true,
    },
    {
      group: GroupMenu.ACCOUNT,
      name: ItemMenuName.LOGIN_NAME,
      mainItem: true,
      display: false,
    },
    {
      group: GroupMenu.ACCOUNT,
      name: ItemMenuName.MY_PROFILE,
      routerLink: '',
      mainItem: false,
      display: false,
    },
    {
      group: GroupMenu.ACCOUNT,
      name: ItemMenuName.CHANGE_PASSWORD,
      routerLink: '',
      mainItem: false,
      display: false,
    },
    {
      group: GroupMenu.ACCOUNT,
      name: ItemMenuName.SIGN_IN,
      routerLink: '/account/sign-in',
      mainItem: false,
      display: true,
    },
    {
      group: GroupMenu.ACCOUNT,
      name: ItemMenuName.SIGN_UP,
      routerLink: '/account/sign-up',
      mainItem: false,
      display: true,
    },
    {
      group: GroupMenu.ACCOUNT,
      name: ItemMenuName.SIGN_OUT,
      routerLink: '',
      mainItem: false,
      display: false,
    },
  ];

  constructor(private _sessionStorageService: SessionStorageService) {}

  ngOnInit(): void {
    this.getCurentUser();
  }

  get mainItems() {
    return this.menuItems.filter((item) => item.mainItem && item.display);
  }

  public getSubItems(groupMenu: GroupMenu) {
    return this.menuItems.filter(
      (item) => item.group == groupMenu && !item.mainItem && item.display
    );
  }

  private changeDisplayMenuItem() {
    if (this.currentUser) {
      if (this.isAdminUser) {
        this.changeDisplayItemMenu(ItemMenuName.MANAGEMENT, true);
      }
      this.changeDisplayItemMenu(ItemMenuName.ACCOUNT, false);
      this.changeDisplayItemMenu(ItemMenuName.SIGN_IN, false);
      this.changeDisplayItemMenu(ItemMenuName.SIGN_UP, false);
      this.changeDisplayItemMenu(ItemMenuName.MY_PROFILE, true);
      this.changeDisplayItemMenu(ItemMenuName.SIGN_OUT, true);
      this.changeDisplayItemMenu(ItemMenuName.LOGIN_NAME, true);
      this.setDisplayLoginName(this.currentUser.fullname);
    }
  }

  private changeDisplayItemMenu(
    itemName: ItemMenuName | string,
    state: boolean
  ) {
    let itemMenu = this.menuItems.find((item) => item.name == itemName);
    if (itemMenu) {
      itemMenu.display = state;
    }
  }

  private setDisplayLoginName(loginName: string) {
    let itemMenu = this.menuItems.find(
      (item) => item.name == ItemMenuName.LOGIN_NAME
    );
    if (itemMenu) {
      itemMenu.name = loginName;
    }
  }

  private getCurentUser() {
    const loginUser: User = this._sessionStorageService.getData(
      ESessionKeyCredentials.USER
    );
    if (loginUser) {
      this.currentUser = {
        ...loginUser,
        avatar: loginUser.avatar ? `${rootApi}/file/${loginUser.avatar}` : '',
      };
      this.isAdminUser = loginUser.authorities.some(
        (item) => item.authority == ROLE.ADMIN
      );
      this.changeDisplayMenuItem();
    }
  }

  public onClickMenuSubItem(menuItem: MenuItem) {
    switch (menuItem.name) {
      case ItemMenuName.SIGN_OUT:
        this._sessionStorageService.clearAllData();
        this.getCurentUser();
    }
  }
}
