import { Component, OnInit, Type } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ROLE } from 'src/app/model/ERole';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/service/http.service';
import { ConfirmDeleteComponent } from '../../share/confirm-delete/confirm-delete.component';
import { UserDetailComponent } from '../pop-up/user-detail/user-detail.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  public showPopup: boolean = false;
  public users: User[] = [];
  public itemsOfPage: User[] = [];
  public pageSize: number = 3;
  public currentPage: number = 1;
  public maxSizePage: number = 5;
  public modelsPopup: { [name: string]: Type<any> } = {
    newOrEdit: UserDetailComponent,
    confirmDelete: ConfirmDeleteComponent,
  };

  constructor(
    private httpService: HttpService,
    private _modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const url = '/user/manage';
    this.getData(url);
  }

  private getData(url: string) {
    this.httpService.get<User[]>(url).subscribe((res) => {
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

  public search(keyword: string) {
    const url = `/user/manage/search?keyword=${keyword.trim()}`;
    this.getData(url);
  }

  public openPopup2(name: string){
    this._modalService.open(this.modelsPopup[name]);
  }
}
