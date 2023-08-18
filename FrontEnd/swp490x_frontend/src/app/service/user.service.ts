import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../interface/user';
import { ROLE } from '../const/ERole';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser!: User;

  public getCurrentUser() {
    return this.currentUser;
  }

  public setCurrentUser(user: User) {
    this.currentUser = user;
  }

  public isAdminUser(user: User) {
    return this.currentUser.authorities.some(
      (item) => item.authority == ROLE.ADMIN
    );
  }
}
