import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { HttpService } from './http.service';
import { map } from 'rxjs';

export function checkExistEmail(
  httpService: HttpService,
  opposite: boolean = false
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const url = '/user/manage/check-exist';
    return httpService.post<boolean>(url, { email: control.value }).pipe(
      map((result) => {
        return (result && !opposite) || (!result && opposite)
          ? { emailExist: true }
          : null;
      })
    );
  };
}

export function checkCorrectCurrentPassword(
  httpService: HttpService,
  email: string
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const url = '/user/manage/check-exist';
    return httpService.post<boolean>(url, { email: control.value }).pipe(
      map((result) => {
        return { emailExist: true };
      })
    );
  };
}
