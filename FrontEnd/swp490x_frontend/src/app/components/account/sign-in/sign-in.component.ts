import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInResponse } from 'src/app/interface/sign-in-response';
import { FormService } from 'src/app/service/form.service';
import { HttpService } from 'src/app/service/http.service';
import { ToastService } from 'src/app/service/toast.service';
import { EToastMessage } from 'src/app/const/EToastMessage';
import { EToastClass } from 'src/app/const/EToastClass';
import { EToken } from 'src/app/const/EToken';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public signInForm!: FormGroup;
  private formFields = {
    email: 'email',
    password: 'password',
  };

  constructor(
    private _formService: FormService,
    private _httpService: HttpService,
    private _router: Router,
    private _toastService: ToastService
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
            localStorage.setItem(EToken.ACCESS_TOKEN, res.token);
            this._router.navigate(['/home']);
          }
        });
    }
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
