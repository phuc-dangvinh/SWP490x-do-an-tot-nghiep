import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/product.interface';
import { mockProductList } from './mock-products';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit {
  public productList: Product[] = [];

  ngOnInit(): void {
    this.productList = mockProductList;
  }
}
