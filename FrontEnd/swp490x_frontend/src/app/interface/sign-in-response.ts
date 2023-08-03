import { User } from './user';

export interface SignInResponse {
  token: string;
  user: User;
}
