import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { ESessionKeyCredentials } from '../interface/session-key-credentials.enum';
import { User } from '../interface/user';

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

  constructor(private _localStorageService: LocalStorageService) {}

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
    this.setIsUserLogin(
      !!this._localStorageService.getData(ESessionKeyCredentials.USER)
    );
    return this.isUserLogin$;
  }

  public setIsUserLogin(isLogin: boolean) {
    this.isUserLogin$.next(isLogin);
  }

  public getCurrentUser(): User {
    return this._localStorageService.getData(ESessionKeyCredentials.USER);
  }
}
