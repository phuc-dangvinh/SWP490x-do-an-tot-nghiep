import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public saveData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getData(key: string): any {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  public removeData(key: string): void {
    localStorage.removeItem(key);
  }

  public clearAllData(): void {
    localStorage.clear();
  }
}
