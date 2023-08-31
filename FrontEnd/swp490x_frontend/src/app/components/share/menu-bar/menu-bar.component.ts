import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ROLE } from 'src/app/const/ERole';
import { menuItems } from 'src/app/const/menu-items';
import { rootApi } from 'src/app/enviroments/environment';
import {
  GroupMenu,
  ItemMenuName,
  MenuItem,
} from 'src/app/interface/menu-item.interface';
import { EKeyCredentials } from 'src/app/interface/key-credentials.enum';
import { User } from 'src/app/interface/user';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit, OnDestroy {
  private isAdminUser: boolean = false;
  public currentUser!: User;
  private unsubscribe$: Subject<void> = new Subject<void>();
  private menuItems: MenuItem[] = menuItems;
  private isLogin: boolean = false;

  constructor(
    private _localStorageService: LocalStorageService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this._userService
      .getIsUserLogin()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.isLogin = res;
        if (this.isLogin) {
          this.getInfoFromLocal();
        }
        this.changeMenu();
      });
  }

  get mainItems() {
    return this.menuItems.filter((item) => item.isMainItem && item.isActive);
  }

  public getSubItems(groupMenu: GroupMenu) {
    return this.menuItems.filter(
      (item) => item.group == groupMenu && !item.isMainItem && item.isActive
    );
  }

  private changeMenu() {
    if (this.isAdminUser) {
      this.toggleItem(ItemMenuName.MANAGEMENT, this.isLogin);
    }
    this.toggleItem(ItemMenuName.ACCOUNT, !this.isLogin);
    this.toggleItem(ItemMenuName.SIGN_IN, !this.isLogin);
    this.toggleItem(ItemMenuName.SIGN_UP, !this.isLogin);
    this.setDisplayName(this.isLogin ? this.currentUser.fullname : '');
    this.toggleItem(ItemMenuName.LOGIN_NAME, this.isLogin);
    this.toggleItem(ItemMenuName.MY_PROFILE, this.isLogin);
    this.toggleItem(ItemMenuName.CHANGE_PASSWORD, this.isLogin);
    this.toggleItem(ItemMenuName.SIGN_OUT, this.isLogin);
  }

  private toggleItem(itemName: ItemMenuName, state: boolean) {
    let itemMenu = this.menuItems.find((item) => item.itemName == itemName);
    if (itemMenu) {
      itemMenu.isActive = state;
    }
  }

  private setDisplayName(loginName: string) {
    let itemMenu = this.menuItems.find(
      (item) => item.itemName == ItemMenuName.LOGIN_NAME
    );
    if (itemMenu) {
      itemMenu.displayName = loginName;
    }
  }

  private getInfoFromLocal() {
    const sessionUser: User = this._localStorageService.getData(
      EKeyCredentials.USER
    );
    if (sessionUser) {
      this.currentUser = {
        ...sessionUser,
        avatar: sessionUser.avatar
          ? `${rootApi}/file/${sessionUser.avatar}`
          : '',
      };
      this.isAdminUser = sessionUser.authorities.some(
        (item) => item.authority == ROLE.ADMIN
      );
    }
  }

  private handleLogout() {
    this._localStorageService.clearAllData();
    this._userService.setIsUserLogin(false);
  }

  public clickSubItem(menuItem: MenuItem) {
    switch (menuItem.itemName) {
      case ItemMenuName.SIGN_OUT:
        this.handleLogout();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
