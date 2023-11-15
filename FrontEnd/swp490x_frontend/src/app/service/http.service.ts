import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { rootApi } from '../enviroments/environment';
import { LocalStorageService } from './local-storage.service';
import { EKeyCredentials } from '../interface/key-credentials.enum';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private _localStorageService: LocalStorageService
  ) {}

  private getHttpOptions() {
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    let token = this._localStorageService.getData(EKeyCredentials.TOKEN);
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return { headers: headers };
  }

  // private handleError<T>(result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     return of(result as T);
  //   };
  // }
  // .pipe(catchError(this.handleError<T>()));

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(rootApi + url, this.getHttpOptions());
  }

  post<T>(url: string, payload: any) {
    return this.http.post<T>(rootApi + url, payload, this.getHttpOptions());
  }

  put<T>(url: string, payload: any) {
    return this.http.put<T>(rootApi + url, payload, this.getHttpOptions());
  }

  delete<T>(url: string) {
    return this.http.delete<T>(rootApi + url, this.getHttpOptions());
  }

  uploadFile<T>(url: string, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<T>(rootApi + url, formData, this.getHttpOptions());
  }
  getFile<T>(url: string, fileName: string) {
    return this.http.get<T>(rootApi + url + fileName, this.getHttpOptions());
  }
}
