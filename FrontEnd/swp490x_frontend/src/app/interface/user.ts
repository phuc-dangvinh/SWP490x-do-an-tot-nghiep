import { Gender } from '../const/shipment-const';
import { Authority } from './authority';

export interface User {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  authorities: Authority[];
  avatar: string;
  checked: boolean;
  isAdmin: boolean;
  gender: Gender;
  address: string;
}
