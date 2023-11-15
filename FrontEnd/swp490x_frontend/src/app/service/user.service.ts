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

  constructor(private _localStorageService: LocalStorageService) {}

  public getCurrentUser() {
    return this.currentUser$;
  }

  public setCurrentUser(user: User | null) {
    this.currentUser$.next(user);
    if (user) {
      this._localStorageService.saveData(EKeyCredentials.USER, user);
    } else {
      this._localStorageService.clearAllData();
    }
  }
}
