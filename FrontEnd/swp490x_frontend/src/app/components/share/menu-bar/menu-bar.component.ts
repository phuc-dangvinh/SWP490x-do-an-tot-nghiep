import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ROLE } from 'src/app/const/ERole';
import { menuItems } from 'src/app/const/menu-items';
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
export class MenuBarComponent implements OnInit, OnDestroy {
  private isAdminUser: boolean = false;
  public currentUser!: User;
  private unsubscribe$: Subject<void> = new Subject<void>();
  private menuItems: MenuItem[] = menuItems;

  constructor(
    private _sessionStorageService: SessionStorageService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this._userService
      .getIsUserLogin()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        console.log('getIsUserLogin',res);
        if (res) {
          this.getCurentUserLogin();
        } else {
          this.handleLogout();
        }
      });
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

  private getCurentUserLogin() {
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
        this._userService.setIsUserLogin(false);
    }
  }

  private handleLogout() {
    this._sessionStorageService.clearAllData();
    this.menuItems = menuItems;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
