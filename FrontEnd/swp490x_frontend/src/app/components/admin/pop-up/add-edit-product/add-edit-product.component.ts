import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmDeleteComponent } from 'src/app/components/share/pop-up-dialog/confirm-delete/confirm-delete.component';
import { EToastClass } from 'src/app/const/EToastClass';
import { EToastMessage } from 'src/app/const/EToastMessage';
import { rootApi } from 'src/app/enviroments/environment';
import { Category } from 'src/app/interface/category.interface';
import { ImageProduct, Product } from 'src/app/interface/product.interface';
import { CategoryService } from 'src/app/service/category.service';
import { FormService } from 'src/app/service/form.service';
import { HttpService } from 'src/app/service/http.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent
  implements OnInit, AfterContentChecked, OnDestroy
{
  @Input() isEdit: boolean = false;
  @Input() productEdit!: Product;
  @Output() clickSave = new EventEmitter<void>();
  @ViewChild('confirmDelete') confirmDelete:
    | TemplateRef<ConfirmDeleteComponent>
    | undefined;
  private unSubcribe$: Subject<void> = new Subject<void>();
  public listCategories: Category[] = [];
  public formAddOrEditProduct!: FormGroup;
  public formFields = {
    name: 'name',
    price: 'price',
    description: 'description',
    categoryId: 'categoryId',
  };
  public imagesDisplay: ImageProduct[] = [];
  public rootApiRequest = rootApi;
  public urlUploadImage: string = '/image/product/manage/upload';
  public activeModel!: NgbModalRef;
  private imagePendingDelete!: ImageProduct;

  constructor(
    private _httpService: HttpService,
    private _formService: FormService,
    private _modalService: NgbModal,
    private _changeDetector: ChangeDetectorRef,
    private _toastService: ToastService,
    private _categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getListCategories();
    this.formAddOrEditProduct = this._formService.buildFormAddOrEditProduct();
    this.fillForm();
  }

  ngAfterContentChecked(): void {
    this._changeDetector.detectChanges();
  }

  private getListCategories() {
    this._categoryService.getCategoriesList
      .pipe(takeUntil(this.unSubcribe$))
      .subscribe((res) => {
        if (res) {
          this.listCategories = res;
        }
      });
  }

  public onHasResultUploadFile(event: ImageProduct) {
    this.imagesDisplay.push(event);
  }

  public onCancel() {
    const url = '/image/product/manage/delete-images-none-product';
    this._httpService.delete(url).subscribe((res) => {
      this._modalService.dismissAll();
    });
  }

  public onSave() {
    if (this.formAddOrEditProduct.valid) {
      if (this.isEdit) {
        const url = '/product/manage/update';
        const payload = {
          ...this.formAddOrEditProduct.value,
          imageIds: this.imagesDisplay.map((item) => item.id),
          id: this.productEdit.id,
        };
        this._httpService.put(url, payload).subscribe((res) => {
          if (res) {
            this.clickSave.emit();
            this._toastService.showMessage(
              EToastClass.SUCCESS,
              EToastMessage.UPDATE_PRODUCT_SUCCESS
            );
            this._modalService.dismissAll();
          } else {
            this._toastService.showMessage(
              EToastClass.DANGER,
              EToastMessage.FAIL
            );
          }
        });
      } else {
        const url = '/product/manage/add';
        const payload = {
          ...this.formAddOrEditProduct.value,
          imageIds: this.imagesDisplay.map((item) => item.id),
        };
        this._httpService.post(url, payload).subscribe((res) => {
          if (res) {
            this.clickSave.emit();
            this._toastService.showMessage(
              EToastClass.SUCCESS,
              EToastMessage.ADD_PRODUCT_SUCCESS
            );
            this._modalService.dismissAll();
          } else {
            this._toastService.showMessage(
              EToastClass.DANGER,
              EToastMessage.FAIL
            );
          }
        });
      }
    }
  }

  public openConfirmDelete(image: ImageProduct) {
    this.imagePendingDelete = image;
    this.activeModel = this._modalService.open(this.confirmDelete);
  }

  public cancelDelete() {
    this.activeModel.dismiss();
  }

  private fillForm() {
    if (this.isEdit) {
      this.imagesDisplay = this.productEdit.imageProducts;
      this.nameFormControl.setValue(this.productEdit.name);
      this.priceFormControl.setValue(this.productEdit.price);
      this.categoryIdFormControl.setValue(this.productEdit.category.id);
      this.descriptionFormControl.setValue(this.productEdit.description);
    }
  }

  public tmpDeleteImage() {
    this.imagesDisplay = this.imagesDisplay.filter(
      (item) => item !== this.imagePendingDelete
    );
    this.activeModel.dismiss();
  }

  get nameFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formAddOrEditProduct,
      this.formFields.name
    );
  }

  get priceFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formAddOrEditProduct,
      this.formFields.price
    );
  }

  get descriptionFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formAddOrEditProduct,
      this.formFields.description
    );
  }

  get categoryIdFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formAddOrEditProduct,
      this.formFields.categoryId
    );
  }

  get nameErrorMessages() {
    return this._formService.getErrorMessage(
      this.formAddOrEditProduct,
      this.formFields.name
    );
  }

  get priceErrorMessages() {
    return this._formService.getErrorMessage(
      this.formAddOrEditProduct,
      this.formFields.price
    );
  }

  get descriptionErrorMessages() {
    return this._formService.getErrorMessage(
      this.formAddOrEditProduct,
      this.formFields.description
    );
  }

  get categoryIdErrorMessages() {
    return this._formService.getErrorMessage(
      this.formAddOrEditProduct,
      this.formFields.categoryId
    );
  }

  ngOnDestroy(): void {
    this.unSubcribe$.next();
    this.unSubcribe$.complete();
  }
}
