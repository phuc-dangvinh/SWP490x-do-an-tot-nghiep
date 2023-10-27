import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { rootApi } from 'src/app/enviroments/environment';
import { ItemAddToCart } from 'src/app/interface/cart';
import { Product } from 'src/app/interface/product.interface';
import { CartService } from 'src/app/service/cart.service';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private idProduct: string = '';
  public product!: Product;
  public rootApiRequest = rootApi;
  public quantity: number = 1;
  private userId: string = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _httpService: HttpService,
    private _userService: UserService,
    private _router: Router,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this.idProduct = this._activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.getProductInfo();
    this._userService
      .getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.userId = res.id;
        }
      });
  }

  private getProductInfo() {
    const url = `/product/get-by-id?id=${this.idProduct}`;
    this._httpService.get<Product>(url).subscribe((res) => {
      if (res) {
        this.product = res;
      }
    });
  }

  public increaseQuantity() {
    this.quantity++;
  }

  public reduceQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  public addToCart() {
    const item: ItemAddToCart = {
      userId: this.userId,
      productId: this.product.id,
      quantity: this.quantity,
    };
    if (item.userId) {
      this._cartService.addItemToCart(item);
    } else {
      this._cartService.setItemPedingAddCart(item);
      this._router.navigate(['account/sign-in']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
