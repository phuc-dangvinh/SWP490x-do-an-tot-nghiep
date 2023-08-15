export interface MenuItem {
  icon?: string;
  name: string;
  horizontalLine?: boolean;
  routerLink?: string;
  subItems?: MenuItem[];
}
