import {
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Category } from 'src/app/interface/category.interface';
import { HttpService } from 'src/app/service/http.service';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/service/toast.service';
import { EToastMessage } from 'src/app/const/EToastMessage';
import { EToastClass } from 'src/app/const/EToastClass';
import { ConfirmDeleteComponent } from 'src/app/components/share/pop-up-dialog/confirm-delete/confirm-delete.component';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @ViewChild('addNewCategory') addNewCategory:
    | TemplateRef<AddEditCategoryComponent>
    | undefined;
  @ViewChild('confirmDelete') confirmDelete:
    | TemplateRef<ConfirmDeleteComponent>
    | undefined;
  public listCategories: Category[] = [];
  public selectedCategory!: Category;
  public actionCategory!: Category;
  public isEdit: boolean = false;

  constructor(
    private _httpService: HttpService,
    private _modalService: NgbModal,
    private _toastService: ToastService,
    private _categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getListCategories();
  }

  private getListCategories() {
    const url = '/category/get-all';
    this._httpService.get<Category[]>(url).subscribe((res) => {
      if (res) {
        this._categoryService.setCategoriesList = res;
        this.listCategories =
          res.length > 0 ? [{ id: '', name: 'ALL' }, ...res] : res;
      }
    });
  }

  public showPopupAddNewCategory() {
    this.isEdit = false;
    this._modalService.open(this.addNewCategory, { size: 'lg' });
  }

  public showPopupEditCategory(category: Category, event: Event) {
    event.stopPropagation();
    this.isEdit = true;
    this.actionCategory = category;
    this._modalService.open(this.addNewCategory, { size: 'lg' });
  }

  public showPopupConfirmDeleteCategory(category: Category, event: Event) {
    event.stopPropagation();
    this.actionCategory = category;
    this._modalService.open(this.confirmDelete, { size: 'md' });
  }

  public processDeleteCategory() {
    const url = '/category/manage/delete';
    this._httpService.post(url, [this.actionCategory.id]).subscribe((res) => {
      if (res) {
        this._toastService.showMessage(
          EToastClass.SUCCESS,
          EToastMessage.DELETE_SUCCESS
        );
        this.dismissPopup();
        this.getListCategories();
      }
    });
  }

  public dismissPopup() {
    this._modalService.dismissAll();
  }

  public saveAddOrUpdateCategory() {
    this.dismissPopup();
    this.getListCategories();
    this._toastService.showMessage(
      EToastClass.SUCCESS,
      this.isEdit
        ? EToastMessage.UPDATE_CATEGORY_SUCCESS
        : EToastMessage.ADD_CATEGORY_SUCCESS
    );
  }

  public onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this._categoryService.setCategorySelected = category;
  }
}
