import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from './service/local-storage.service';
import { UserService } from './service/user.service';
import { HttpService } from './service/http.service';
import { User } from './interface/user';
import { EKeyCredentials } from './interface/key-credentials.enum';
import { Subject, catchError, of, switchMap, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  title = 'swp490x_frontend';

  constructor(
    private _localStorageService: LocalStorageService,
    private _userService: UserService,
    private _httpService: HttpService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    const token: string = this._localStorageService.getData(
      EKeyCredentials.TOKEN
    );
    if (token) {
      this._httpService
        .get<boolean>('/auth/check-valid-token')
        .pipe(
          catchError((err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status == 401) {
                return of('Unauthorized');
              } else {
                return of(null);
              }
            } else {
              return of(null);
            }
          })
        )
        .subscribe((res) => {
          if (res == true) {
            const user: User = this._localStorageService.getData(
              EKeyCredentials.USER
            );
            if (user) {
              this._userService.setCurrentUser(user);
            }
          } else if (res == 'Unauthorized') {
            this._userService.setCurrentUser(null);
          }
        });
    }
    this._userService
      .getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this._cartService.refreshTotalItems(res.id);
        } else {
          this._cartService.setTotalItems(0);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
