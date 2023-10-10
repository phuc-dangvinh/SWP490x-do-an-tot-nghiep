import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { EToastClass } from 'src/app/const/EToastClass';
import { EToastMessage } from 'src/app/const/EToastMessage';
import { rootApi } from 'src/app/enviroments/environment';
import { Category } from 'src/app/interface/category.interface';
import { Product } from 'src/app/interface/product.interface';
import { CategoryService } from 'src/app/service/category.service';
import { HttpService } from 'src/app/service/http.service';
import { ToastService } from 'src/app/service/toast.service';
import { ConfirmDeleteComponent } from '../../share/pop-up-dialog/confirm-delete/confirm-delete.component';
import { AddEditProductComponent } from '../pop-up/add-edit-product/add-edit-product.component';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit, OnDestroy {
  @ViewChild('addOrEditProduct') addOrEditProduct:
    | TemplateRef<AddEditProductComponent>
    | undefined;
  @ViewChild('confirmDeletePopup') confirmDeletePopup:
    | TemplateRef<ConfirmDeleteComponent>
    | undefined;
  private unSubcribe$: Subject<void> = new Subject<void>();
  public productList: Product[] = [];
  public listCategories: Category[] = [];
  public isEdit: boolean = false;
  public productEdit!: Product;
  public rootApiRequest = rootApi;
  private listProductChecked: Product[] = [];
  private categorySelected!: Category;
  public currentPage: number = 1;
  public pageSize: number = 6;
  public isCheckedCheckAll: boolean = false;
  private itemsOfPage: Product[] = [];
  private singleProductPendingDelete!: Product;
  private isDeleteMulti: boolean = false;

  constructor(
    private _httpService: HttpService,
    private _modalService: NgbModal,
    private _toastService: ToastService,
    private _categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getListProductByCategory();
    this.getCategorySelected();
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

  private getCategorySelected() {
    this._categoryService.getCategorySelected
      .pipe(takeUntil(this.unSubcribe$))
      .subscribe((res) => {
        if (res) {
          this.categorySelected = res;
          this.getListProductByCategory();
        }
      });
  }

  public getListProductByCategory() {
    const url = `/product/get-by-category?id=${
      this.categorySelected ? this.categorySelected.id : ''
    }`;
    this._httpService.get<Product[]>(url).subscribe((res) => {
      if (res) {
        this.productList = res.map((item) => ({
          ...item,
          checked: false,
        }));
      }
    });
  }

  public searchProduct(searchInfo: {}) {
    const payload = {
      ...searchInfo,
      categoryId: this.categorySelected ? this.categorySelected.id : '',
    };
    const url = '/product/search';
    this._httpService.post<Product[]>(url, payload).subscribe((res) => {
      if (res) {
        this.productList = res.map((item) => ({
          ...item,
          checked: false,
        }));
      }
    });
  }

  public showPopupConfirmDeleteSingle(product: Product) {
    this.isDeleteMulti = false;
    this.singleProductPendingDelete = product;
    this._modalService.open(this.confirmDeletePopup);
  }

  public showPopupConfirmDeleteMulti() {
    this.isDeleteMulti = true;
    this._modalService.open(this.confirmDeletePopup);
  }

  public dismissPopupConfirmDelete() {
    this._modalService.dismissAll();
  }

  public processsDelete() {
    const url = '/product/manage/delete';
    const payload = this.isDeleteMulti
      ? this.listProductChecked.map((item) => item.id)
      : [this.singleProductPendingDelete.id];
    this._httpService.post(url, payload).subscribe((res) => {
      if (res) {
        this.getListProductByCategory();
        this._modalService.dismissAll();
        this._toastService.showMessage(
          EToastClass.SUCCESS,
          EToastMessage.DELETE_SUCCESS
        );
      }
    });
  }

  public onSelectPage(page: number) {
    this.currentPage = page;
  }

  public onChangeSize(size: number) {
    this.pageSize = size;
  }

  private getItemsOfPage() {
    const start = this.pageSize * this.currentPage - (this.pageSize - 1);
    const end = this.pageSize * this.currentPage;
    this.itemsOfPage = this.productList.slice(start - 1, end);
  }

  get checkedCheckAll(): boolean {
    this.getItemsOfPage();
    return !this.itemsOfPage.some((item) => !item.checked);
  }

  public changeCheckedCheckAll() {
    this.getItemsOfPage();
    this.itemsOfPage.forEach((item) => {
      item.checked = this.isCheckedCheckAll;
    });
    this.collectChecked();
  }

  public collectChecked() {
    this.listProductChecked = this.productList.filter((item) => item.checked);
  }

  ngOnDestroy(): void {
    this.unSubcribe$.next();
    this.unSubcribe$.complete();
  }
}
