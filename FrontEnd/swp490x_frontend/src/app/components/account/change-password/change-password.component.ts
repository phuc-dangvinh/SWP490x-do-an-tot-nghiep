import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from 'src/app/service/form.service';
import { HttpService } from 'src/app/service/http.service';

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
  private strengthNewPassword: number = 0;

  constructor(
    private _formService: FormService,
    private _httpService: HttpService,
    private _router: Router
  ) {}
  ngOnInit(): void {
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

  public submitForm() {}

  public getStrengthPassword(event: number) {
    this.strengthNewPassword = event;
  }
}
