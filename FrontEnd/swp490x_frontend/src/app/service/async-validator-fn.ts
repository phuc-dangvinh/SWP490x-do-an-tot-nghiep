import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { HttpService } from './http.service';
import { map } from 'rxjs';

export function checkExistEmail(
  httpService: HttpService,
  opposite: boolean = false
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const url = '/user/check-exist';
    return httpService.post<boolean>(url, { email: control.value }).pipe(
      map((result) => {
        return (result && !opposite) || (!result && opposite)
          ? { emailExist: true }
          : null;
      })
    );
  };
}

export function checkCurrentPassword(
  httpService: HttpService,
  email: string
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const url = '/user/check-current-password';
    return httpService
      .post<boolean>(url, { email: email, password: control.value })
      .pipe(
        map((result) => {
          return !result ? { wrongPassword: true } : null;
        })
      );
  };
}

export function checkExistCategoryName(
  httpService: HttpService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const url = '/category/manage/exist';
    return httpService.post<boolean>(url, control.value).pipe(
      map((res) => {
        return res ? { existNameCategory: true } : null;
      })
    );
  };
}
