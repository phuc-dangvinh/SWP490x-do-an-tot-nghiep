import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { HttpService } from './http.service';
import { map } from 'rxjs';

export function checkExistEmail(httpService: HttpService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const url = '/user/manage/check-exist';
    return httpService.post<boolean>(url, { email: control.value }).pipe(
      map((result) => {
        return result ? { emailExist: true } : null;
      })
    );
  };
}
