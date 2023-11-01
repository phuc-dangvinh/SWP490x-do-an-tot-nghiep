import {
  MenuItem,
  GroupMenu,
  ItemMenuName,
} from '../interface/menu-item.interface';

export const menuItems: MenuItem[] = [
  {
    group: GroupMenu.HOME,
    itemName: ItemMenuName.HOME,
    displayName: ItemMenuName.HOME,
    icon: 'bi-house',
    routerLink: '/home',
    isMainItem: true,
    isActive: true,
  },
  {
    group: GroupMenu.MANAGEMENT,
    itemName: ItemMenuName.MANAGEMENT,
    displayName: ItemMenuName.MANAGEMENT,
    icon: 'bi-sliders2',
    isMainItem: true,
    isActive: false,
  },
  {
    group: GroupMenu.MANAGEMENT,
    itemName: ItemMenuName.USER,
    displayName: ItemMenuName.USER,
    routerLink: '/admin/user-management',
    isMainItem: false,
    isActive: true,
  },
  {
    group: GroupMenu.MANAGEMENT,
    itemName: ItemMenuName.PRODUCT,
    displayName: ItemMenuName.PRODUCT,
    routerLink: '/admin/product-management',
    isMainItem: false,
    isActive: true,
  },
  {
    group: GroupMenu.CART,
    itemName: ItemMenuName.CART,
    displayName: ItemMenuName.CART,
    icon: 'bi-cart',
    routerLink: '/cart',
    isMainItem: true,
    isActive: true,
  },
  {
    group: GroupMenu.ACCOUNT,
    itemName: ItemMenuName.ACCOUNT,
    displayName: ItemMenuName.ACCOUNT,
    icon: 'bi-person',
    isMainItem: true,
    isActive: true,
  },
  {
    group: GroupMenu.ACCOUNT,
    itemName: ItemMenuName.LOGIN_NAME,
    displayName: '',
    isMainItem: true,
    isActive: false,
  },
  {
    group: GroupMenu.ACCOUNT,
    itemName: ItemMenuName.MY_PROFILE,
    displayName: ItemMenuName.MY_PROFILE,
    routerLink: '',
    isMainItem: false,
    isActive: false,
  },
  {
    group: GroupMenu.ACCOUNT,
    itemName: ItemMenuName.CHANGE_PASSWORD,
    displayName: ItemMenuName.CHANGE_PASSWORD,
    routerLink: '/account/change-password',
    isMainItem: false,
    isActive: false,
  },
  {
    group: GroupMenu.ACCOUNT,
    itemName: ItemMenuName.SIGN_IN,
    displayName: ItemMenuName.SIGN_IN,
    routerLink: '/account/sign-in',
    isMainItem: false,
    isActive: true,
  },
  {
    group: GroupMenu.ACCOUNT,
    itemName: ItemMenuName.SIGN_UP,
    displayName: ItemMenuName.SIGN_UP,
    routerLink: '/account/sign-up',
    isMainItem: false,
    isActive: true,
  },
  {
    group: GroupMenu.ACCOUNT,
    itemName: ItemMenuName.SIGN_OUT,
    displayName: ItemMenuName.SIGN_OUT,
    routerLink: '',
    isMainItem: false,
    isActive: false,
  },
  {
    group: GroupMenu.ABOUT,
    itemName: ItemMenuName.ABOUT,
    displayName: ItemMenuName.ABOUT,
    routerLink: '/about',
    isMainItem: true,
    isActive: true,
  },
];
