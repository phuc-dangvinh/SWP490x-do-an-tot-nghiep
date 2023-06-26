import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ROLE } from 'src/app/const/ERole';
import { User } from 'src/app/interface/user';
import { HttpService } from 'src/app/service/http.service';
import { BUTTON } from '../../../const/EButton';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  private getUserUrl = '/user/manage';
  public users: User[] = [];
  public itemsOfPage: User[] = [];
  public pageSize: number = 4;
  public currentPage: number = 1;
  public maxSizePage: number = 5;
  public pageSizeOptionChange: number[] = [4, 6, 8, 10];
  // public modelsPopup: { [name: string]: Type<any> } = {
  //   newOrEdit: UserDetailComponent,
  //   confirmDelete: ConfirmDeleteComponent,
  // };
  public readonly BUTTON = BUTTON;
  private selectedUserIds: string[] = [];

  constructor(
    private httpService: HttpService,
    private _modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    const url = '/user/manage';
    this.httpService.get<User[]>(url).subscribe((res) => {
      this.users = res;
      this.changeSelectPage(1);
    });
  }

  public search(keyword: string) {
    const url = `/user/manage/search?keyword=${keyword.trim()}`;
    this.getUser();
  }

  public processsDelete(popupContent: any) {
    const url = '/user/manage';
    this.httpService.deleteByPost(url, this.selectedUserIds).subscribe(() => {
      this.getUser();
      this.closePopup(popupContent);
    });
  }

  public checkAdmin(user: User): boolean {
    return user.authorities.some((item) => item.authority == ROLE.ADMIN);
  }

  public changeSelectPage(page: number) {
    const start = this.pageSize * page - (this.pageSize - 1);
    const end = this.pageSize * page;
    this.itemsOfPage = this.users.slice(start - 1, end);
  }

  public changePageSize() {
    this.currentPage = 1;
    this.changeSelectPage(this.currentPage);
  }

  private getSelectedId(id: string) {
    this.selectedUserIds = [];
    this.selectedUserIds.push(id);
  }

  public openPopup(button: BUTTON, popupContent: any, id?: string) {
    switch (button) {
      case BUTTON.EDIT:
        this._modalService.open(popupContent, { size: 'lg' });
        break;
      case BUTTON.NEW:
        this._modalService.open(popupContent, { size: 'lg' });
        break;
      case BUTTON.DELETE:
        this._modalService.open(popupContent);
        if (id !== undefined) {
          this.getSelectedId(id);
        }
        break;
      default:
    }
  }

  public closePopup(popupContent: any) {
    this._modalService.dismissAll(popupContent);
  }
}
