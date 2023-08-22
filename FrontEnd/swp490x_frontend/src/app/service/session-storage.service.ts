import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  public saveData(key: string, data: any): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  public getData(key: string): any {
    const data = sessionStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  public removeData(key: string): void {
    sessionStorage.removeItem(key);
  }

  public clearAllData(): void {
    sessionStorage.clear();
  }
}
