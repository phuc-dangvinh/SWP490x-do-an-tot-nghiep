import { Component, OnInit } from '@angular/core';
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

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get<User[]>('/user/manage').subscribe((res) => {
      this.users = res;
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
}
