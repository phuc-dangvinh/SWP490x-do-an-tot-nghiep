import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs';
import { CartItem, ItemBuyNow, ItemAddToCart } from '../interface/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemPedingAddCart$: BehaviorSubject<ItemAddToCart | null> =
    new BehaviorSubject<ItemAddToCart | null>(null);
  private itemsBuyNow$: BehaviorSubject<ItemBuyNow[]> = new BehaviorSubject<
    ItemBuyNow[]
  >([]);
  private totalItems$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private _httpService: HttpService) {}

  public getItemPedingAddCart() {
    return this.itemPedingAddCart$;
  }

  public setItemPedingAddCart(item: ItemAddToCart | null) {
    this.itemPedingAddCart$.next(item);
  }

  public getItemBuyNow() {
    return this.itemsBuyNow$;
  }

  public setItemBuyNow(item: ItemBuyNow | null) {
    if (item) {
      let items = this.itemsBuyNow$.getValue();
      let existItem = items.find((e) => e.product.id == item.product.id);
      if (existItem) {
        existItem.quantity += 1;
        this.itemsBuyNow$.next(items);
      } else {
        this.itemsBuyNow$.next([...items, item]);
      }
    } else {
      this.itemsBuyNow$.next([]);
    }
  }

  public addItemToCart(item: ItemAddToCart) {
    return this._httpService.post('/cart/add-to-cart', item);
  }

  public getTotalItems() {
    return this.totalItems$;
  }

  public setTotalItems(total: number) {
    this.totalItems$.next(total);
  }

  public getListItems(userId: string) {
    return this._httpService.get<CartItem[]>(`/cart/${userId}`);
  }

  public calTotalItems(list: CartItem[]): number {
    let total: number = 0;
    list.forEach((item) => (total += item.quantity));
    return total;
  }

  public refreshTotalItems(userId: string) {
    this.getListItems(userId).subscribe((res) => {
      this.setTotalItems(this.calTotalItems(res));
    });
  }
}
