import { MenuItem, GroupMenu, ItemMenuName } from '../interface/menu-item';

export const menuItems: MenuItem[] = [
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
