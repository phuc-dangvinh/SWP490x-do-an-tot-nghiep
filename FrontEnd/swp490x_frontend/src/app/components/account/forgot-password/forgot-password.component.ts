import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/service/form.service';
import { SignUpSuccessComponent } from '../sign-up-success/sign-up-success.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';
import { EContentPopupSuccess } from 'src/app/interface/content-popup-success.enum';
import { FormControlError } from 'src/app/interface/form-control-error';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('resetSuccesPopup')
  resetSuccesPopup!: TemplateRef<SignUpSuccessComponent>;
  public forgotPasswordForm!: FormGroup;
  private formFields = {
    email: 'email',
  };
  public readonly contentPopupSuccess = EContentPopupSuccess;

  constructor(
    private _formService: FormService,
    private _modalService: NgbModal,
    private _httpService: HttpService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this._formService.buildForgotPasswordForm();
  }

  get emailFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.forgotPasswordForm,
      this.formFields.email
    );
  }
  get emailErrorMessages() {
    const customErrorMessage: FormControlError = {
      error: 'emailExist',
      message: 'This email is not exist',
    };
    return this._formService.getErrorMessage(
      this.forgotPasswordForm,
      this.formFields.email,
      '',
      customErrorMessage
    );
  }

  public submitForm() {
    if (this.forgotPasswordForm.valid) {
      const url = '/user/reset-password';
      this._httpService
        .post(url, { idOrEmail: this.emailFormControl.value })
        .subscribe((res) => {
          if (res) {
            this._modalService.open(this.resetSuccesPopup, {
              centered: true,
            });
          }
        });
    }
  }

  public handleClickContinueButton() {
    this._modalService.dismissAll();
    this._router.navigate(['/account/sign-in']);
  }
}
