import { Component, OnInit } from '@angular/core';
import { OperatorFunction, Observable, debounceTime, map } from 'rxjs';
import { ROLE } from 'src/app/model/ERole';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  public showPopup: boolean = false;
  public users: User[] = [];
  public itemsOfPage: User[] = [];
  public pageSize: number = 2;
  public currentPage: number = 1;
  public maxSizePage: number = 5;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get<User[]>('/user/manage').subscribe((res) => {
      this.users = res;
      this.onChangePage(1);
    });
  }

  public openPopup() {
    this.showPopup = true;
  }

  public closePopup() {
    this.showPopup = false;
  }

  public checkAdmin(user: User): boolean {
    return user.authorities.some((item) => item.authority == ROLE.ADMIN);
  }

  public onChangePage(page: number) {
    const start = this.pageSize * page - (this.pageSize - 1);
    const end = this.pageSize * page;
    this.itemsOfPage = this.users.slice(start - 1, end);
  }
}
