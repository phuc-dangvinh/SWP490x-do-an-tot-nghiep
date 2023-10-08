import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { EKeyCredentials } from '../interface/key-credentials.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser$ = new BehaviorSubject(null);
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
