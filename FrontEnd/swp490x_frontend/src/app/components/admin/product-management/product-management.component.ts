import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { rootApi } from 'src/app/enviroments/environment';
import { Category } from 'src/app/interface/category.interface';
import { Product } from 'src/app/interface/product.interface';
import { HttpService } from 'src/app/service/http.service';
import { ToastService } from 'src/app/service/toast.service';
import { AddEditProductComponent } from '../pop-up/add-edit-product/add-edit-product.component';

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
  private selectedCategoryId: string = '';
  public isEdit: boolean = false;
  public productEdit!: Product;
  public rootApiRequest = rootApi;

  constructor(
    private _httpService: HttpService,
    private _modalService: NgbModal,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getListProductByCategory();
  }

  public getListCategories(list: Category[]) {
    this.listCategories = list;
  }

  public showPopupAddProduct() {
    this.isEdit = false;
    this._modalService.open(this.addOrEditProduct, { size: 'xl' });
  }

  public showPopupEditProduct(product: Product) {
    this.isEdit = true;
    this.productEdit = product;
    this._modalService.open(this.addOrEditProduct, { size: 'xl' });
  }

  public handleSelectedCategory(category: Category) {
    this.selectedCategoryId = category.id;
  }

  public getListProductByCategory() {
    const url = `/product/get-by-category?id=${this.selectedCategoryId}`;
    this._httpService.get<Product[]>(url).subscribe((res) => {
      if (res) {
        this.productList = res;
      }
    });
  }
}