export interface MenuItem {
  group: GroupMenu;
  icon?: string;
  itemName: ItemMenuName
  displayName: string;
  horizontalLine?: boolean;
  routerLink?: string;
  isMainItem: boolean;
  isActive: boolean;
}

export enum GroupMenu {
  HOME = 'HOME',
  MANAGEMENT = 'MANAGEMENT',
  CART = 'CART',
  ACCOUNT = 'ACCOUNT',
}

export enum ItemMenuName {
  HOME = 'Home',
  MANAGEMENT = 'Management',
  USER = 'User',
  PRODUCT = 'Product',
  CATEGORY = 'Category',
  CART = 'Cart',
  ACCOUNT = 'Account',
  LOGIN_NAME = 'Login name',
  MY_PROFILE = 'My profile',
  CHANGE_PASSWORD = 'Change password',
  SIGN_IN = 'Sign in',
  SIGN_UP = 'Sign up',
  SIGN_OUT = 'Sign out',
}
