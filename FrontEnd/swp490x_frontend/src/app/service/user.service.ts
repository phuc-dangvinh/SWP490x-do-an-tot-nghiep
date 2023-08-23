import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interface/user';
import { ROLE } from '../const/ERole';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private currentUser$: BehaviorSubject<User> = new BehaviorSubject<any>(null);
  // private isCurrentUserAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(
  //   false
  // );
  private isUserLogin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  // public getCurrentUser() {
  //   return this.currentUser$;
  // }

  // public setCurrentUser(user: User) {
  //   this.currentUser$.next(user);
  //   this.isCurrentUserAdmin$.next(
  //     user.authorities.some((item) => item.authority == ROLE.ADMIN)
  //   );
  // }

  // public getIsCurrentUserAdmin() {
  //   return this.isCurrentUserAdmin$;
  // }

  public getIsUserLogin() {
    return this.isUserLogin$;
  }

  public setIsUserLogin(isLogin: boolean) {
    this.isUserLogin$.next(isLogin);
  }
}
