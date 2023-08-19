export interface MenuItem {
  group: GroupMenu;
  icon?: string;
  name: ItemMenuName | string;
  horizontalLine?: boolean;
  routerLink?: string;
  mainItem: boolean;
  display: boolean;
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
  LOGIN_NAME = '',
  MY_PROFILE = 'My profile',
  CHANGE_PASSWORD = 'Change password',
  SIGN_IN = 'Sign in',
  SIGN_UP = 'Sign up',
  SIGN_OUT = 'Sign out',
}
