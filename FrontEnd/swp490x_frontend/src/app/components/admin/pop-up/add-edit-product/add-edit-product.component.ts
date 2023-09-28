import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { rootApi } from 'src/app/enviroments/environment';
import { Category } from 'src/app/interface/category.interface';
import { Product } from 'src/app/interface/product.interface';
import { FormService } from 'src/app/service/form.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent
  implements OnInit, OnChanges, AfterViewInit
{
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
    image: 'image',
  };
  public srcFile: string = '';
  public selectedCategoryId: string = '';
  public isLoading: boolean = true;

  constructor(
    private _httpService: HttpService,
    private _formService: FormService,
    private _modalService: NgbModal
  ) {}

  ngAfterViewInit(): void {
    this.isLoading = false;
    // this.fillForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // const product: Product = changes['productEdit'].currentValue;
    // console.log('product change', product);
    // if (product) {
    //   console.log('vào if change');
    //   this.srcFile = `${rootApi}/file/get/${this.productEdit.image}`;
    //   this.imageFormControl.setValue(this.productEdit.image);
    //   this.nameFormControl.setValue(this.productEdit.name);
    //   this.priceFormControl.setValue(this.productEdit.price);
    //   this.selectedCategoryId = this.productEdit.category.id;
    //   this.descriptionFormControl.setValue(this.productEdit.description);
    //   console.log('form change', this.formAddOrEditProduct.value);
    // }
  }

  ngOnInit(): void {
    this.formAddOrEditProduct = this._formService.buildFormAddOrEditProduct();
    this.fillForm();
  }

  public onHasSrcFile(event: string) {
    this.srcFile = `${rootApi}/file/get/${event}`;
    this.imageFormControl.setValue(event);
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
            console.log('res save new product: ', res);
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
      this.srcFile = `${rootApi}/file/get/${this.productEdit.image}`;
      this.imageFormControl.setValue(this.productEdit.image);
      this.nameFormControl.setValue(this.productEdit.name);
      this.priceFormControl.setValue(this.productEdit.price);
      this.selectedCategoryId = this.productEdit.category.id;
      this.descriptionFormControl.setValue(this.productEdit.description);
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

  get imageFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formAddOrEditProduct,
      this.formFields.image
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

  get imageErrorMessages() {
    return this._formService.getErrorMessage(
      this.formAddOrEditProduct,
      this.formFields.image
    );
  }
}
