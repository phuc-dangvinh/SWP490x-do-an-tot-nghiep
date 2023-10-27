import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs';
import { ItemAddToCart } from '../interface/cart';
import { ToastService } from './toast.service';
import { EToastClass } from '../const/EToastClass';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemPedingAddCart$: BehaviorSubject<ItemAddToCart | null> =
    new BehaviorSubject<ItemAddToCart | null>(null);

  constructor(
    private _httpService: HttpService,
    private _toastService: ToastService
  ) {}

  public getItemPedingAddCart() {
    return this.itemPedingAddCart$;
  }

  public setItemPedingAddCart(item: ItemAddToCart | null) {
    this.itemPedingAddCart$.next(item);
  }

  public addItemToCart(item: ItemAddToCart) {
    this._httpService.post('/cart/add-to-cart', item).subscribe((res) => {
      if (res) {
        this._toastService.showMessage(
          EToastClass.SUCCESS,
          `You added ${item.quantity} products to cart`
        );
      }
    });
  }
}
