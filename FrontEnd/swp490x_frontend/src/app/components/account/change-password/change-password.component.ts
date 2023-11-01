import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EToastClass } from 'src/app/const/EToastClass';
import { EToastMessage } from 'src/app/const/EToastMessage';
import { ItemMenuName } from 'src/app/interface/menu-item.interface';
import { ChangePasswordRequest } from 'src/app/interface/request.interface';
import { FormService } from 'src/app/service/form.service';
import { HttpService } from 'src/app/service/http.service';
import { MenuService } from 'src/app/service/menu.service';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public formChangePassword!: FormGroup;
  private formFields = {
    currentPassword: 'currentPassword',
    changePassword: 'changePassword',
    newPassword: 'newPassword',
    confirmNewPassword: 'confirmNewPassword',
  };
  public showPasswordStrengthMeter: boolean = false;

  constructor(
    private _formService: FormService,
    private _httpService: HttpService,
    private _router: Router,
    private _userService: UserService,
    private _toastService: ToastService,
    private _menuService: MenuService
  ) {}

  ngOnInit(): void {
    this._menuService.setActiveMenu(ItemMenuName.LOGIN_NAME);
    this.formChangePassword = this._formService.buildChangePasswordForm();
  }

  get currentPasswordControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formChangePassword,
      this.formFields.currentPassword
    );
  }

  get newPasswordControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formChangePassword,
      this.formFields.changePassword,
      this.formFields.newPassword
    );
  }

  get confirmNewPasswordControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formChangePassword,
      this.formFields.changePassword,
      this.formFields.confirmNewPassword
    );
  }

  get currentPasswordErrorMessages() {
    return this._formService.getErrorMessage(
      this.formChangePassword,
      this.formFields.currentPassword
    );
  }

  get newPasswordErrorMessages() {
    return this._formService.getErrorMessage(
      this.formChangePassword,
      this.formFields.changePassword,
      this.formFields.newPassword
    );
  }

  get confirmNewPasswordErrorMessages() {
    return this._formService.getErrorMessage(
      this.formChangePassword,
      this.formFields.changePassword,
      this.formFields.confirmNewPassword,
      undefined,
      true
    );
  }

  public onFocusInputNewPassword() {
    this.showPasswordStrengthMeter = true;
  }

  public onBlurInputNewPassword() {
    this.showPasswordStrengthMeter = false;
  }

  public submitForm() {
    this.formChangePassword.markAllAsTouched();
    if (this.formChangePassword.valid) {
      const url = '/user/change-password';
      const payload: ChangePasswordRequest = {
        email: this._userService.getCurrentUser().getValue()?.['email'] ?? '',
        oldPassword: this.currentPasswordControl.value,
        newPassword: this.newPasswordControl.value,
      };
      this._httpService.post(url, payload).subscribe((res) => {
        console.log('subscribe', res);
        if (res) {
          this._toastService.show({
            content: EToastMessage.CHANGE_PASSWORD_SUCCESS,
            classname: EToastClass.SUCCESS,
            delay: 3000,
          });
          this._router.navigate(['/home']);
        } else {
          this._toastService.show({
            content: EToastMessage.FAIL,
            classname: EToastClass.DANGER,
            delay: 3000,
          });
        }
      });
    }
  }
}
