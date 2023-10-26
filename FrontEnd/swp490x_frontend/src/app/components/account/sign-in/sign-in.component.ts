import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInResponse } from 'src/app/interface/sign-in-response';
import { FormService } from 'src/app/service/form.service';
import { HttpService } from 'src/app/service/http.service';
import { ToastService } from 'src/app/service/toast.service';
import { EToastMessage } from 'src/app/const/EToastMessage';
import { EToastClass } from 'src/app/const/EToastClass';
import { UserService } from 'src/app/service/user.service';
import { EKeyCredentials } from 'src/app/interface/key-credentials.enum';
import { ROLE } from 'src/app/const/ERole';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public signInForm!: FormGroup;
  public isInvalid: boolean = false;
  private formFields = {
    email: 'email',
    password: 'password',
  };

  constructor(
    private _formService: FormService,
    private _httpService: HttpService,
    private _router: Router,
    private _toastService: ToastService,
    private _userService: UserService,
    private _localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.signInForm = this._formService.buildSignInForm();
  }

  public submitForm() {
    if (this.signInForm.valid) {
      const url = '/auth/login';
      this._httpService
        .post<SignInResponse>(url, this.signInForm.value)
        .subscribe((res) => {
          if (res) {
            this._toastService.show({
              content: EToastMessage.SIGN_IN_SUCCES,
              classname: EToastClass.SUCCESS,
              delay: 3000,
            });
            this._localStorageService.saveData(
              EKeyCredentials.TOKEN,
              res.token
            );
            this._userService.setCurrentUser(res.user);
            this._router.navigate(
              res.user.authorities.some((item) => item.authority == ROLE.ADMIN)
                ? ['/admin/user-management']
                : ['/home']
            );
          } else {
            this.isInvalid = true;
          }
        });
    }
  }

  public touchForm() {
    this.isInvalid = false;
  }

  get emailFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.signInForm,
      this.formFields.email
    );
  }

  get passwordFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.signInForm,
      this.formFields.password
    );
  }

  get emailErrorMessages() {
    return this._formService.getErrorMessage(
      this.signInForm,
      this.formFields.email
    );
  }

  get passwordErrorMessages() {
    return this._formService.getErrorMessage(
      this.signInForm,
      this.formFields.password
    );
  }
}
