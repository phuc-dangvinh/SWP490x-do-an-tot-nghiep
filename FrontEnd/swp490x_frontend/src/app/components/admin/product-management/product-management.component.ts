import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { rootApi } from 'src/app/enviroments/environment';
import { Category } from 'src/app/interface/category.interface';
import { Product } from 'src/app/interface/product.interface';
import { HttpService } from 'src/app/service/http.service';
import { ToastService } from 'src/app/service/toast.service';
import { ConfirmDeleteComponent } from '../../share/pop-up-dialog/confirm-delete/confirm-delete.component';
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
  @ViewChild('confirmDeletePopup') confirmDeletePopup:
    | TemplateRef<ConfirmDeleteComponent>
    | undefined;
  public productList: Product[] = [];
  public listCategories: Category[] = [];
  public isEdit: boolean = false;
  public productEdit!: Product;
  public rootApiRequest = rootApi;
  private listProductAction: Product[] = [];
  private categorySelected!: Category;

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

  public onCategorySelected(category: Category) {
    this.categorySelected = category;
    this.getListProductByCategory();
  }

  public getListProductByCategory() {
    const url = `/product/get-by-category?id=${
      this.categorySelected ? this.categorySelected.id : ''
    }`;
    this._httpService.get<Product[]>(url).subscribe((res) => {
      if (res) {
        this.productList = res;
      }
    });
  }

  public showPopupConfirmDelete(product: Product) {
    this.listProductAction.push(product);
    this._modalService.open(this.confirmDeletePopup);
  }

  public dismissPopup() {
    this.listProductAction = [];
    this._modalService.dismissAll();
  }

  public processsDelete() {
    const url = '/product/manage/delete';
    const payload = this.listProductAction.map((item) => item.id);
    this._httpService.post(url, payload).subscribe((res) => {
      if (res) {
        this.getListProductByCategory();
        this._modalService.dismissAll();
      }
    });
  }
}
