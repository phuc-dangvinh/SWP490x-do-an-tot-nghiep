import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public signUpForm!: FormGroup;
  private formFields = {
    avatar: 'avatar',
    fullname: 'fullname',
    email: 'email',
    phone: 'phone',
  };

  constructor(private _formService: FormService) {}
  ngOnInit(): void {
    this.signUpForm = this._formService.buildSignUpForm();
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
