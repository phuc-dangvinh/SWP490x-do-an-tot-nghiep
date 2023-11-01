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
import { User } from 'src/app/interface/user';
import { CartService } from 'src/app/service/cart.service';
import { MenuService } from 'src/app/service/menu.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public readonly itemName = ItemMenuName;
  public currentUser: User | undefined;
  private menuItems: MenuItem[] = menuItems;
  public rootApiRequest = rootApi;
  public selectedToggleItem: string = '';
  public activeItem: string = '';
  public totalCartItems: number = 0;
  private stateOpen: boolean = false;

  constructor(
    private _userService: UserService,
    private _menuService: MenuService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this._userService
      .getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.currentUser = res ?? undefined;
        this.changeMenu();
      });
    this._menuService
      .getActiveMenu()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.activeItem = res;
        }
      });
    this._cartService
      .getTotalItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.totalCartItems = res;
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
    let isAdmin = false;
    let isLogin = false;
    let displayName = '';
    if (this.currentUser) {
      isAdmin = this.currentUser.authorities.some(
        (item) => item.authority == ROLE.ADMIN
      );
      isLogin = true;
      displayName = this.currentUser.fullname;
    }
    this.toggleItem(ItemMenuName.MANAGEMENT, isAdmin);
    this.toggleItem(ItemMenuName.ACCOUNT, !isLogin);
    this.toggleItem(ItemMenuName.SIGN_IN, !isLogin);
    this.toggleItem(ItemMenuName.SIGN_UP, !isLogin);
    this.setDisplayName(displayName);
    this.toggleItem(ItemMenuName.LOGIN_NAME, isLogin);
    // this.toggleItem(ItemMenuName.MY_PROFILE, isLogin);
    this.toggleItem(ItemMenuName.CHANGE_PASSWORD, isLogin);
    this.toggleItem(ItemMenuName.SIGN_OUT, isLogin);
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

  public onSelectSubItem(subItem: MenuItem) {
    switch (subItem.itemName) {
      case ItemMenuName.SIGN_OUT:
        this._userService.setCurrentUser(null);
        break;
      default:
        break;
    }
  }

  public onSelectMainItem(item: MenuItem) {
    if (this.stateOpen) {
      this.selectedToggleItem = item.itemName;
    }
  }

  public toggleMainItem(state: boolean) {
    this.stateOpen = state;
    if (!this.stateOpen) {
      this.selectedToggleItem = '';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
