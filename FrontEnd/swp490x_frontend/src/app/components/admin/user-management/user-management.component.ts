import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ROLE } from 'src/app/const/ERole';
import { User } from 'src/app/interface/user';
import { HttpService } from 'src/app/service/http.service';
import { BUTTON } from '../../../const/EButton';
import { ToastComponent } from '../../share/toast/toast.component';
import { TextMessage } from 'src/app/interface/text-message';
import { NotDeleteAdminComponent } from '../../share/pop-up-dialog/not-delete-admin/not-delete-admin.component';
import { UserDetailComponent } from '../pop-up/user-detail/user-detail.component';
import { ConfirmDeleteComponent } from '../../share/pop-up-dialog/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  public users: User[] = [];
  public userEdit: User | undefined;
  public isEdit: boolean = false;
  public itemsOfPage: User[] = [];
  public pageSize: number = 4;
  public currentPage: number = 1;
  public maxSizePage: number = 5;
  public pageSizeOptionChange: number[] = [4, 6, 8, 10];
  public readonly BUTTON = BUTTON;
  private selectedUserIds: string[] = [];
  @ViewChild('toast') toast: ToastComponent | undefined;
  @ViewChild('userDetailPopup') userDetailPopup:
    | TemplateRef<UserDetailComponent>
    | undefined;
  @ViewChild('confirmDeletePopup') confirmDeletePopup:
    | TemplateRef<ConfirmDeleteComponent>
    | undefined;
  @ViewChild('notDeleteAdminPopup') notDeleteAdminPopup:
    | TemplateRef<NotDeleteAdminComponent>
    | undefined;

  constructor(
    private httpService: HttpService,
    private _modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(toLastPage?: boolean) {
    const url = '/user/manage';
    this.httpService.get<User[]>(url).subscribe((res) => {
      this.users = res;
      this.changeSelectPage(
        toLastPage ? this.calcTotalPages() : this.currentPage
      );
    });
  }

  public search(keyword: string) {
    const url = `/user/manage/search?keyword=${keyword.trim()}`;
    this.httpService.get<User[]>(url).subscribe((res) => {
      this.users = res;
      this.currentPage = 1;
      this.changeSelectPage(this.currentPage);
    });
  }

  public processsDelete() {
    const url = '/user/manage';
    this.httpService
      .deleteByPost<TextMessage>(url, this.selectedUserIds)
      .subscribe((res) => {
        if (res.message.includes('failed')) {
          this.toast?.showDanger(res.message, 3000);
        } else {
          this.getUser();
          this.toast?.showSuccess(res.message, 3000);
        }
        this.closePopup();
      });
  }

  public resetPassword(id: string) {
    this.getSelectedId(id);
    const url = '/user/manage/reset-password';
    this.httpService
      .post<TextMessage>(url, this.selectedUserIds)
      .subscribe((res) => {
        this.toast?.showSuccess(res.message, 3000);
      });
  }

  public checkAdmin(user: User): boolean {
    return user.authorities.some((item) => item.authority == ROLE.ADMIN);
  }

  public changeSelectPage(page: number) {
    this.currentPage = page;
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

  public openPopup(button: BUTTON, user?: User) {
    switch (button) {
      case BUTTON.EDIT:
        this.isEdit = true;
        this.userEdit = user;
        this._modalService.open(this.userDetailPopup, { size: 'md' });
        break;
      case BUTTON.NEW:
        this._modalService.open(this.userDetailPopup, { size: 'md' });
        break;
      case BUTTON.DELETE:
        if (user) {
          this.checkAdmin(user)
            ? this._modalService.open(this.notDeleteAdminPopup, { size: 'sm' })
            : this._modalService.open(this.confirmDeletePopup, { size: 'md' });
          this.getSelectedId(user.id);
          break;
        } else {
          break;
        }
      default:
    }
  }

  public closePopup() {
    this._modalService.dismissAll();
    this.isEdit = false;
  }

  public newOrUpdateUser(message: string) {
    this.toast?.showSuccess(message, 3000);
    this.getUser(!this.isEdit);
    this.closePopup();
  }

  private calcTotalPages() {
    return (this.users.length + this.pageSize - 1) / this.pageSize;
  }

  public changeRole(id: string, isAdmin: boolean) {
    const payload = { id, isAdmin };
    const url = '/user/manage/change-role';
    this.httpService.put<TextMessage>(url, payload).subscribe((res) => {
      this.getUser();
      this.toast?.showSuccess(res.message, 3000);
    });
  }
}
