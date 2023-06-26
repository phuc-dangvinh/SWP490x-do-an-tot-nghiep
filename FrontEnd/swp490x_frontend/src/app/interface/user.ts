import { Authority } from './authority';

export interface User {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  authorities: Authority[];
  avatar: string;
}
