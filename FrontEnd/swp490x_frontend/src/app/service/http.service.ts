import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { rootApi } from '../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // private httpOption = {
  //   observe: 'response',
  // };

  constructor(private http: HttpClient) {}

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  get<T>(url: string): Observable<T> {
    return this.http
      .get<T>(rootApi + url)
      .pipe(tap(), catchError(this.handleError<T>()));
  }

  post<T>(url: string, payload: any) {
    return this.http
      .post<T>(rootApi + url, payload, this.httpOptions)
      .pipe(tap(), catchError(this.handleError<T>()));
  }

  put<T>(url: string, payload: any) {
    return this.http
      .put<T>(rootApi + url, payload, this.httpOptions)
      .pipe(tap(), catchError(this.handleError<T>()));
  }

  deleteByPost<T>(url: string, ids: string[]) {
    return this.http
      .post<T>(rootApi + url, ids, this.httpOptions)
      .pipe(tap(), catchError(this.handleError<T>()));
  }
}
