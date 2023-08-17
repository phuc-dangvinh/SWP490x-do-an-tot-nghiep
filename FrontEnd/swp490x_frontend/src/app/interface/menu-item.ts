export interface MenuItem {
  group: GroupMenu;
  icon?: string;
  name: string;
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
