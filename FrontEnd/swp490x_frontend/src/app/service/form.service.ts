import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  checkExistEmail
} from './async-validator-fn';
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
    {
      error: 'wrongConfirmNewPassword',
      message: 'The password confirmation does not match',
    },
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

  public buildForgotPasswordForm(): FormGroup {
    return this._formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email],
        checkExistEmail(this._httpService, true),
      ],
    });
  }

  public buildChangePasswordForm(): FormGroup {
    return this._formBuilder.group({
      currentPassword: ['', [Validators.required]],
      changePassword: this._formBuilder.group(
        {
          newPassword: ['', [Validators.required]],
          confirmNewPassword: ['', [Validators.required]],
        },
        {
          validators: this.checkConfirmNewPassword,
        }
      ),
    });
  }

  public checkConfirmNewPassword(
    control: AbstractControl
  ): ValidationErrors | null {
    const controlValue = control.value;
    return controlValue.newPassword === controlValue.confirmNewPassword
      ? null
      : { wrongConfirmNewPassword: true };
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
    subControlName?: string,
    customError?: FormControlError,
    includeParentControlError: boolean = false
  ): string[] {
    const controlErrors = this.getFormControl(form, controlName).errors;
    const subControlErrors = subControlName
      ? this.getFormControl(form, controlName, subControlName).errors
      : null;
    const finalControlErrors = subControlName
      ? includeParentControlError
        ? { ...controlErrors, ...subControlErrors }
        : subControlErrors
      : controlErrors;
    let errorMessages: string[] = [];
    if (finalControlErrors) {
      Object.keys(finalControlErrors).forEach((key) => {
        const errorObj = this.controlErrors.find(
          (controlError) => controlError.error == key
        );
        if (errorObj) {
          errorMessages.push(
            errorObj.error == customError?.error
              ? customError.message
              : errorObj.message
          );
        }
      });
    }
    return errorMessages;
  }
}
