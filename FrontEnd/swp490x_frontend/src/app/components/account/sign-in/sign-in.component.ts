import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInResponse } from 'src/app/interface/sign-in-response';
import { FormService } from 'src/app/service/form.service';
import { HttpService } from 'src/app/service/http.service';
import { ToastComponent } from '../../share/toast/toast.component';

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
  @ViewChild('toast') toast!: ToastComponent;

  constructor(
    private _formService: FormService,
    private _httpService: HttpService,
    private _router: Router
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
            console.log('res login', res);
            console.log('continue handle process');
            // this.toast?.showSuccess(EToastMessage.SIGN_IN_SUCCES, 3000);
            this._router.navigate(['/home']);
            //continue handle process
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
