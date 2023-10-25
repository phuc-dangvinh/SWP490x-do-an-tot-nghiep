import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ROLE } from 'src/app/const/ERole';
import { User } from 'src/app/interface/user';
import { HttpService } from 'src/app/service/http.service';
import { BUTTON } from '../../../const/EButton';
import { TextMessage } from 'src/app/interface/text-message';
import { NotDeleteAdminComponent } from '../../share/pop-up-dialog/not-delete-admin/not-delete-admin.component';
import { UserDetailComponent } from '../pop-up/user-detail/user-detail.component';
import { ConfirmDeleteComponent } from '../../share/pop-up-dialog/confirm-delete/confirm-delete.component';
import { rootApi } from 'src/app/enviroments/environment';
import { ToastService } from 'src/app/service/toast.service';
import { EToastClass } from 'src/app/const/EToastClass';
import { DeleteResponse } from 'src/app/interface/delete-response';
import { EToastMessage } from 'src/app/const/EToastMessage';
import { Gender } from 'src/app/const/shipment-const';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  public readonly BUTTON = BUTTON;
  public readonly gender = Gender;
  public users: User[] = [];
  public userEdit!: User;
  public isEdit: boolean = false;
  public itemsOfPage: User[] = [];
  public pageSize: number = 4;
  public currentPage: number = 1;
  public maxSizePage: number = 5;
  public pageSizeOptionChange: number[] = [4, 6, 8, 10];
  public selectedUserIds: string[] = [];
  private selectedTmpUserId: string = '';
  public directActionButton: boolean = false;
  public disableCheckAll: boolean = false;
  public alreadyCheckAll: boolean = false;

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
    private _modalService: NgbModal,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(toLastPage?: boolean) {
    const url = '/user/manage';
    this.httpService.get<User[]>(url).subscribe((res) => {
      this.users = this.mapUsers(res);
      this.changeSelectPage(
        toLastPage ? this.calcTotalPages() : this.currentPage
      );
      this.selectedUserIds = [];
    });
  }

  public search(keyword: string) {
    const url = `/user/manage/search?keyword=${keyword.trim()}`;
    this.httpService.get<User[]>(url).subscribe((res) => {
      this.users = this.mapUsers(res);
      this.currentPage = 1;
      this.changeSelectPage(this.currentPage);
    });
  }

  public processsDelete(directButtonAction: boolean = false) {
    const url = '/user/manage';
    const payload = directButtonAction
      ? [this.selectedTmpUserId]
      : this.selectedUserIds;
    this.httpService
      .deleteByPost<DeleteResponse>(url, payload)
      .subscribe((res) => {
        if (res) {
          let toastContent = '';
          let toastClass: EToastClass;
          switch (res.deleted) {
            case payload.length:
              toastContent = EToastMessage.DELETE_SUCCESS;
              toastClass = EToastClass.SUCCESS;
              break;
            case 0:
              toastContent = EToastMessage.DELETE_FAILED;
              toastClass = EToastClass.DANGER;
              break;
            default:
              toastContent = `Deleted ${res.deleted} successfully`;
              toastClass = EToastClass.STANDARD;
          }
          this._toastService.show({
            content: toastContent,
            classname: toastClass,
            delay: 3000,
          });
          if (res.deleted > 0) {
            this.getUser();
          }
        }
        this.closePopup();
      });
  }

  public resetPassword(id: string) {
    const url = '/user/reset-password';
    this.httpService
      .post<TextMessage>(url, { idOrEmail: id })
      .subscribe((res) => {
        if (res) {
          this._toastService.show({
            content: EToastMessage.RESET_PASSWORD_SUCCESS,
            classname: EToastClass.SUCCESS,
            delay: 3000,
          });
        }
      });
  }

  public changeSelectPage(page: number) {
    this.currentPage = page;
    const start = this.pageSize * page - (this.pageSize - 1);
    const end = this.pageSize * page;
    this.itemsOfPage = this.users.slice(start - 1, end);
    this.isDisableCheckAll();
    this.isAlreadyCheckAll();
  }

  public changePageSize() {
    this.currentPage = 1;
    this.changeSelectPage(this.currentPage);
  }

  public openPopup(button: BUTTON, user?: User) {
    switch (button) {
      case BUTTON.EDIT:
        this.isEdit = true;
        if (user) {
          this.userEdit = user;
        }
        this._modalService.open(this.userDetailPopup, { size: 'lg' });
        break;
      case BUTTON.NEW:
        this._modalService.open(this.userDetailPopup, { size: 'lg' });
        break;
      case BUTTON.DELETE:
        if (user) {
          user.isAdmin
            ? this._modalService.open(this.notDeleteAdminPopup, { size: 'sm' })
            : this._modalService.open(this.confirmDeletePopup, { size: 'md' });
          this.directActionButton = true;
          this.selectedTmpUserId = user.id;
          break;
        } else {
          this._modalService.open(this.confirmDeletePopup, { size: 'md' });
          this.directActionButton = false;
          break;
        }
      default:
    }
  }

  public closePopup() {
    this._modalService.dismissAll();
    this.isEdit = false;
  }

  public newOrUpdateUser(message: EToastMessage) {
    this._toastService.show({
      content: message,
      classname: EToastClass.SUCCESS,
      delay: 3000,
    });
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
      this._toastService.show({
        content: EToastMessage.CHANGE_ROLE_SUCCESS,
        classname: EToastClass.SUCCESS,
        delay: 3000,
      });
    });
  }

  public checkItem(user: User, checked: boolean) {
    user.checked = checked;
    this.isAlreadyCheckAll();
    if (checked) {
      this.selectedUserIds.push(user.id);
    } else {
      const index = this.selectedUserIds.indexOf(user.id);
      if (index >= 0) {
        this.selectedUserIds.splice(index, 1);
      }
    }
  }

  public checkAllItems(checked: boolean) {
    this.itemsOfPage.forEach((item) => {
      if (!item.isAdmin && item.checked !== checked) {
        item.checked = checked;
        this.checkItem(item, checked);
      }
    });
  }

  private isDisableCheckAll() {
    let count: number = 0;
    this.itemsOfPage.forEach((user) => {
      if (user.isAdmin) {
        count++;
      }
    });
    if (count === this.itemsOfPage.length) {
      this.disableCheckAll = true;
    } else {
      this.disableCheckAll = false;
    }
  }

  private isAlreadyCheckAll() {
    let count: number = 0;
    this.itemsOfPage.forEach((user) => {
      if (user.checked) {
        count++;
      }
    });
    if (count === this.itemsOfPage.length) {
      this.alreadyCheckAll = true;
    } else {
      this.alreadyCheckAll = false;
    }
  }

  private mapUsers(users: User[]) {
    return users.map((user) => ({
      ...user,
      checked: false,
      isAdmin: user.authorities.some((item) => item.authority == ROLE.ADMIN),
      avatar: user.avatar ? `${rootApi}/file/get/${user.avatar}` : '',
    }));
  }
}
