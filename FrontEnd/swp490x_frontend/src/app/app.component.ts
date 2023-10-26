import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LocalStorageService } from './service/local-storage.service';
import { UserService } from './service/user.service';
import { HttpService } from './service/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'swp490x_frontend';

  // constructor(
  //   private _localStorageService: LocalStorageService,
  //   private _userService: UserService,
  //   private _httpService: HttpService
  // ) {}

  ngOnInit(): void {
    // this._httpService.get<boolean>('/auth/check-valid-token').subscribe({
    //   next: (res) => {},
    //   error: (err) => {},
    // });
  }
}
