import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/interface/category.interface';
import { Product } from 'src/app/interface/product.interface';
import { FormService } from 'src/app/service/form.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEditProductComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Input() productEdit!: Product;
  @Input() listCategories: Category[] = [];
  public formAddOrEditProduct!: FormGroup;
  public formFields = {
    name: 'name',
    price: 'price',
    description: 'description',
    categoryId: 'categoryId',
    image: 'image',
  };

  constructor(
    private _httpService: HttpService,
    private _formService: FormService
  ) {}

  ngOnInit(): void {
    console.log('init AddEditProductComponent');
    this.productEdit = {
      id: '5853cec4-1729-4fcb-af66-c72ab0cf39af',
      name: 'Up in Arms',
      price: 14575965,
      description: 'Major Chemicals',
      image: 'http://dummyimage.com/219x100.png/ff4444/ffffff',
      category: { id: '', name: 'Drywall & Acoustical (FED)' },
    };
    this.formAddOrEditProduct = this._formService.buildFormAddOrEditProduct();
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
