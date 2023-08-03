import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { checkExistEmail } from './async-validator-fn';
import { HttpService } from './http.service';
import { FormControlError } from '../interface/form-control-error';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private controlErrors: FormControlError[] = [
    { error: 'required', message: 'Required field' },
    { error: 'email', message: 'Email is not valid' },
    { error: 'passwordNotMatch', message: 'Repeat password is incorrect' },
    { error: 'emailExist', message: 'This email is taken' },
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _httpService: HttpService
  ) {}

  public buildSignUpForm(): FormGroup {
    return this._formBuilder.group({
      avatar: [''],
      fullname: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email],
        checkExistEmail(this._httpService),
      ],
      phone: ['', [Validators.required]],
    });
  }

  public buildSignInForm(): FormGroup {
    return this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public getFormControl(
    form: FormGroup,
    controlName: string,
    subControlName?: string
  ): AbstractControl {
    if (subControlName) {
      return (form.controls[controlName] as FormGroup).controls[subControlName];
    } else {
      return form.controls[controlName];
    }
  }

  public getErrorMessage(
    form: FormGroup,
    controlName: string,
    subControlName?: string
  ): string[] {
    const formErrors = this.getFormControl(form, controlName).errors;
    const subFormErrors = subControlName
      ? this.getFormControl(form, controlName, subControlName).errors
      : null;
    const finalFormErrors = subControlName ? subFormErrors : formErrors;
    let errorMessages: string[] = [];
    if (finalFormErrors) {
      Object.keys(finalFormErrors).forEach((key) => {
        const errorObj = this.controlErrors.find(
          (controlError) => controlError.error == key
        );
        if (errorObj) {
          errorMessages.push(errorObj.message);
        }
      });
    }
    return errorMessages;
  }
}
