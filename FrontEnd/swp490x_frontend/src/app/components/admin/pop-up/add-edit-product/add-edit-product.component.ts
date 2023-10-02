import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs';
import { rootApi } from 'src/app/enviroments/environment';
import { Category } from 'src/app/interface/category.interface';
import { ImageProduct, Product } from 'src/app/interface/product.interface';
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
  public formAddOrEditProduct!: FormGroup;
  public formFields = {
    name: 'name',
    price: 'price',
    description: 'description',
    categoryId: 'categoryId',
  };
  public images: ImageProduct[] = [];
  public rootApiRequest = rootApi;
  public urlUploadImage: string = '/image/product/manage/upload';

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
    console.log('add', event);
    this.images.push(event);
  }

  public onCancel() {
    this._modalService.dismissAll();
  }

  public onSave() {
    if (this.formAddOrEditProduct.valid) {
      if (this.isEdit) {
      } else {
        const url = '/product/manage/add';
        this._httpService
          .post(url, this.formAddOrEditProduct.value)
          .subscribe((res) => {
            if (res) {
              this.clickSave.emit();
              this._modalService.dismissAll();
            }
          });
      }
    }
  }

  private fillForm() {
    if (this.isEdit) {
      this.nameFormControl.setValue(this.productEdit.name);
      this.priceFormControl.setValue(this.productEdit.price);
      this.categoryIdFormControl.setValue(this.productEdit.category.id);
      this.descriptionFormControl.setValue(this.productEdit.description);
    }
  }

  public deleteImage(image: ImageProduct) {
    console.log('delete image: ', image);
    const urlDatabase = `/image/product/manage/delete/${image.id}`;
    const urlFile = `/file/manage/delete/${image.fileName}`;
    this._httpService
      .delete(urlDatabase)
      .pipe(
        // switchMap(() => {
        //   this.images = this.images.filter((item) => item.id !== image.id);
        //   return this._httpService.delete(urlFile);
        // })
      )
      .subscribe((res) => {
        console.log('deleteImage', res);
        if (res) {
          console.log('image before: ', this.images);
          // this.images = this.images.filter((item) => item.id !== image.id);
          console.log('image after: ', this.images);
        }
      });
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
