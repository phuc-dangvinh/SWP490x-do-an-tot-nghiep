import { AbstractControl, ValidatorFn } from '@angular/forms';
import { IPasswordStrengthMeterService } from 'angular-password-strength-meter';

export function checkStrengthPassword(
  passwordStrengthMeterService: IPasswordStrengthMeterService
): ValidatorFn {
  return (control: AbstractControl) => {
    return control.value &&
      passwordStrengthMeterService.score(control.value) < 2
      ? { weakPassword: true }
      : null;
  };
}