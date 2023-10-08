import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { rootApi } from 'src/app/enviroments/environment';
import { User } from 'src/app/interface/user';
import { FormService } from 'src/app/service/form.service';
import { HttpService } from 'src/app/service/http.service';
import { SignUpSuccessComponent } from '../sign-up-success/sign-up-success.component';
import { Router } from '@angular/router';
import { TextMessage } from 'src/app/interface/text-message';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  @ViewChild('signUpSuccesPopup')
  signUpSuccesPopup!: TemplateRef<SignUpSuccessComponent>;
  public signUpForm!: FormGroup;
  private formFields = {
    avatar: 'avatar',
    fullname: 'fullname',
    email: 'email',
    phone: 'phone',
  };
  public avatarFileName: string = '';
  public avatarSrc: string = '';

  constructor(
    private _formService: FormService,
    private _httpService: HttpService,
    private _modalService: NgbModal,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this._formService.buildSignUpForm();
  }

  public onHasFileName(event: string) {
    this.avatarFileName = event;
  }

  public onHasSrcFile(event: TextMessage) {
    this.avatarSrc = `${rootApi}/file/get/${event.info}`;
    this.signUpForm.controls['avatar'].setValue(event.info);
  }

  public submitForm() {
    if (this.signUpForm.valid) {
      const url = '/auth/register';
      const payload = { ...this.signUpForm.value, isAdmin: false };
      this._httpService.post<User>(url, payload).subscribe((res) => {
        if (res) {
          this._modalService.open(this.signUpSuccesPopup, {
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

  get avatarFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.signUpForm,
      this.formFields.avatar
    );
  }

  get fullnameFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.signUpForm,
      this.formFields.fullname
    );
  }

  get emailFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.signUpForm,
      this.formFields.email
    );
  }

  get phoneFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.signUpForm,
      this.formFields.phone
    );
  }

  get fullnameErrorMessages() {
    return this._formService.getErrorMessage(
      this.signUpForm,
      this.formFields.fullname
    );
  }

  get emailErrorMessages() {
    return this._formService.getErrorMessage(
      this.signUpForm,
      this.formFields.email
    );
  }

  get phoneErrorMessages() {
    return this._formService.getErrorMessage(
      this.signUpForm,
      this.formFields.phone
    );
  }
}
