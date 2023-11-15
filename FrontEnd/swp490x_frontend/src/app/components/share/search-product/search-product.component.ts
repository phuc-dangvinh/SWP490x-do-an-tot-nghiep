import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss'],
})
export class SearchProductComponent implements OnInit {
  @Output() clickReset: EventEmitter<void> = new EventEmitter<void>();
  @Output() clickSearch: EventEmitter<{}> = new EventEmitter<{}>();
  public formSearch!: FormGroup;
  public formFields = {
    keyword: 'keyword',
    price: 'price',
    priceFrom: 'priceFrom',
    priceTo: 'priceTo',
  };

  constructor(private _formService: FormService) {}

  ngOnInit(): void {
    this.formSearch = this._formService.buildFormSearchProduct();
  }

  get keywordFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formSearch,
      this.formFields.keyword
    );
  }

  get priceFromFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formSearch,
      this.formFields.price,
      this.formFields.priceFrom
    );
  }

  get priceToFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formSearch,
      this.formFields.price,
      this.formFields.priceTo
    );
  }

  // get keywordErrorMessages() {
  //   return this._formService.getErrorMessage(
  //     this.formSearch,
  //     this.formFields.keyword
  //   );
  // }

  get priceFromErrorMessages() {
    return this._formService.getErrorMessage(
      this.formSearch,
      this.formFields.price,
      this.formFields.priceFrom
    );
  }

  get priceToErrorMessages() {
    return this._formService.getErrorMessage(
      this.formSearch,
      this.formFields.price,
      this.formFields.priceTo,
      undefined,
      true
    );
  }

  public onSearch() {
    this.clickSearch.emit({
      keyword: this.formSearch.value.keyword,
      priceFrom: this.formSearch.value.price.priceFrom,
      priceTo: this.formSearch.value.price.priceTo,
    });
  }

  public onReset() {
    this.formSearch.reset();
    this.clickReset.emit();
  }
}
