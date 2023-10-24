import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { EKeyCredentials } from '../interface/key-credentials.enum';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  private isUserLogin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private _localStorageService: LocalStorageService) {}

  public getIsUserLogin() {
    if (this._localStorageService.getData(EKeyCredentials.USER)) {
      this.setIsUserLogin(true);
    }
    return this.isUserLogin$;
  }

  public setIsUserLogin(isLogin: boolean) {
    this.isUserLogin$.next(isLogin);
    this.loadCurrentUserFromLocal(isLogin);
  }

  private loadCurrentUserFromLocal(isLogin: boolean) {
    if (isLogin) {
      this.currentUser$.next(
        this._localStorageService.getData(EKeyCredentials.USER)
      );
    } else {
      this.currentUser$.next(null);
    }
  }

  public getCurrentUser() {
    return this.currentUser$;
  }
}
