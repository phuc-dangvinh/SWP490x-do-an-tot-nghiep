import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteComponent } from 'src/app/components/share/pop-up-dialog/confirm-delete/confirm-delete.component';
import { rootApi } from 'src/app/enviroments/environment';
import { Category } from 'src/app/interface/category.interface';
import {
  ImageProduct,
  ImageProductPendingAction,
  Product,
} from 'src/app/interface/product.interface';
import { FormService } from 'src/app/service/form.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent implements OnInit, AfterContentChecked {
  @Input() isEdit: boolean = false;
  @Input() productEdit!: Product;
  @Input() listCategories: Category[] = [];
  @Output() clickSave = new EventEmitter<void>();
  @ViewChild('confirmDelete') confirmDelete:
    | TemplateRef<ConfirmDeleteComponent>
    | undefined;
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
  private imageDelete!: ImageProduct;
  public imagesPendingAction: ImageProductPendingAction = {
    add: [],
    delete: [],
  };

  constructor(
    private _httpService: HttpService,
    private _formService: FormService,
    private _modalService: NgbModal,
    private _changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.formAddOrEditProduct = this._formService.buildFormAddOrEditProduct();
    this.fillForm();
  }

  ngAfterContentChecked(): void {
    this._changeDetector.detectChanges();
  }

  public onHasResultUploadFile(event: ImageProduct) {
    this.imagesDisplay.push(event);
    if (this.isEdit) {
      this.imagesPendingAction.add.push(event);
    }
  }

  public onCancel() {
    if (this.isEdit) {
      this.processDeleteImagesPending(this.imagesPendingAction.add);
    } else {
      this.processDeleteImagesPending(this.imagesDisplay);
      this.processDeleteImagesPending(this.imagesPendingAction.delete);
    }
    this._modalService.dismissAll();
  }

  public onSave() {
    if (this.formAddOrEditProduct.valid) {
      if (this.isEdit) {
        this.processDeleteImagesPending(this.imagesPendingAction.delete);
      } else {
        const url = '/product/manage/add';
        const payload = {
          ...this.formAddOrEditProduct.value,
          imageIds: this.imagesDisplay.map((item) => item.id),
        };
        this._httpService.post(url, payload).subscribe((res) => {
          if (res) {
            this.clickSave.emit();
            this._modalService.dismissAll();
          }
        });
        this.processDeleteImagesPending(this.imagesPendingAction.delete);
      }
    }
  }

  public openConfirmDelete(image: ImageProduct) {
    this.imageDelete = image;
    this.activeModel = this._modalService.open(this.confirmDelete);
  }

  public cancelDelete() {
    this.activeModel.dismiss();
  }

  private moveImageToPendingAction(image: ImageProduct) {
    let imageFound = this.imagesDisplay.find((item) => item.id == image.id);
    if (imageFound) {
      this.imagesDisplay = this.imagesDisplay.filter(
        (item) => item !== imageFound
      );
      this.imagesPendingAction.delete.push(imageFound);
    }
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
    this.moveImageToPendingAction(this.imageDelete);
    this.activeModel.dismiss();
  }

  private processDeleteImagesPending(images: ImageProduct[]) {
    if (images) {
      const url = '/image/product/manage/delete';
      this._httpService.deleteByPost(url, images).subscribe((res) => {
        console.log(res, images);
      });
    }
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
}
