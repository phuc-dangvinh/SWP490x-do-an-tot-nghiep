import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/interface/category.interface';
import { Product } from 'src/app/interface/product.interface';
import { HttpService } from 'src/app/service/http.service';
import { ToastService } from 'src/app/service/toast.service';
import { AddEditProductComponent } from '../pop-up/add-edit-product/add-edit-product.component';
import { mockProductList } from './mock-products';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit {
  @ViewChild('addOrEditProduct') addOrEditProduct:
    | TemplateRef<AddEditProductComponent>
    | undefined;
  public productList: Product[] = [];
  public listCategories: Category[] = [];

  constructor(
    private _httpService: HttpService,
    private _modalService: NgbModal,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.productList = mockProductList;
  }

  public getListCategories(list: Category[]) {
    this.listCategories = list;
  }

  public showPopupAddProduct() {
    this._modalService.open(this.addOrEditProduct, { size: 'lg' });
  }
}
