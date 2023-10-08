import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  checkCurrentPassword,
  checkExistCategoryName,
  checkExistEmail,
  checkExistProductName,
} from './async-validator-fn';
import { HttpService } from './http.service';
import { FormControlError } from '../interface/form-control-error';
import { IPasswordStrengthMeterService } from 'angular-password-strength-meter';
import { checkStrengthPassword } from './sync-validator-fn';
import { UserService } from './user.service';

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
    {
      error: 'weakPassword',
      message: 'Weak password',
    },
    {
      error: 'wrongPassword',
      message: 'Wrong password',
    },
    {
      error: 'existNameCategory',
      message: 'Name is already exits',
    },
    {
      error: 'priceEqualZero',
      message: 'Price must be greater than 0',
    },
    {
      error: 'invalidPriceTo',
      message: 'Price must be greater than or equal to price from',
    },
    {
      error: 'min',
      message: 'Price > 0',
    },
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _httpService: HttpService,
    private _passwordStrengthMeterService: IPasswordStrengthMeterService,
    private _userService: UserService
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
      currentPassword: [
        '',
        [Validators.required],
        checkCurrentPassword(
          this._httpService,
          this._userService.getCurrentUser().getValue()?.['email'] ?? ''
        ),
      ],
      changePassword: this._formBuilder.group(
        {
          newPassword: [
            '',
            [
              Validators.required,
              checkStrengthPassword(this._passwordStrengthMeterService),
            ],
          ],
          confirmNewPassword: ['', [Validators.required]],
        },
        {
          validators: this.checkConfirmNewPassword,
        }
      ),
    });
  }

  public buildFormAddOrEditProduct(): FormGroup {
    return this._formBuilder.group({
      name: [
        '',
        [Validators.required],
        checkExistProductName(this._httpService),
      ],
      price: ['', [Validators.required, this.checkPriceGreaterThanZero]],
      description: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
    });
  }

  public buildFormSearchProduct(): FormGroup {
    return this._formBuilder.group({
      categoryId: [''],
      keyword: [''],
      price: this._formBuilder.group(
        {
          priceFrom: ['', [Validators.min(0)]],
          priceTo: ['', [Validators.min(0)]],
        },
        {
          validators: this.checkValidPriceTo,
        }
      ),
    });
  }

  public buildFormAddNewCategory(): FormGroup {
    return this._formBuilder.group({
      categoryName: [
        '',
        [Validators.required],
        checkExistCategoryName(this._httpService),
      ],
    });
  }

  public checkConfirmNewPassword(
    control: AbstractControl
  ): ValidationErrors | null {
    const controlValue = control.value;
    return controlValue.confirmNewPassword &&
      controlValue.newPassword !== controlValue.confirmNewPassword
      ? { wrongConfirmNewPassword: true }
      : null;
  }

  public checkValidPriceTo(control: AbstractControl): ValidationErrors | null {
    const priceFrom = control.value.priceFrom;
    const priceTo = control.value.priceTo;
    return priceFrom > 0 && priceTo < priceFrom
      ? { invalidPriceTo: true }
      : null;
  }

  public checkPriceGreaterThanZero(
    control: AbstractControl
  ): ValidationErrors | null {
    return (control.value as number) > 0 ? null : { priceEqualZero: true };
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
