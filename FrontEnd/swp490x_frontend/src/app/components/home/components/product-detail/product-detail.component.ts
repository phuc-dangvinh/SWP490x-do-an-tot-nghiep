import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rootApi } from 'src/app/enviroments/environment';
import { Product } from 'src/app/interface/product.interface';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  private idProduct: string = '';
  public product!: Product;
  public rootApiRequest = rootApi;
  public quantity: number = 1;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.idProduct = this._activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.getProductInfo();
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
}
