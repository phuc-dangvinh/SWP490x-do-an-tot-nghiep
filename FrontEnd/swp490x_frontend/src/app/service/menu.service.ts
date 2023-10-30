import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemMenuName } from '../interface/menu-item.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private activeMenu$: BehaviorSubject<ItemMenuName | null> =
    new BehaviorSubject<ItemMenuName | null>(null);

  public getActiveMenu() {
    return this.activeMenu$;
  }

  public setActiveMenu(item: ItemMenuName | null) {
    this.activeMenu$.next(item);
  }
}
