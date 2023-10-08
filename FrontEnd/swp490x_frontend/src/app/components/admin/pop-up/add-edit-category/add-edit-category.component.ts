import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/interface/category.interface';
import { FormService } from 'src/app/service/form.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss'],
})
export class AddEditCategoryComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Input() categoryEdit!: Category;
  @Output() clickCancel = new EventEmitter<void>();
  @Output() clickSave = new EventEmitter<void>();
  public isErrorInput: boolean = false;
  public formAddNewCategory!: FormGroup;
  private formFields = {
    categoryName: 'categoryName',
  };

  constructor(
    private _httpService: HttpService,
    private _formService: FormService
  ) {}

  ngOnInit(): void {
    this.formAddNewCategory = this._formService.buildFormAddNewCategory();
    this.fillForm();
  }

  public onSave() {
    if (this.formAddNewCategory.valid) {
      if (this.isEdit) {
        const url = '/category/manage/update';
        const categoryUpdate: Category = {
          id: this.categoryEdit.id,
          name: this.categoryNameFormControl.value,
        };
        this._httpService
          .put<Category>(url, categoryUpdate)
          .subscribe((res) => {
            if (res) {
              this.clickSave.emit();
            }
          });
      } else {
        const url = '/category/manage/add-new';
        this._httpService
          .post<Category>(url, { name: this.categoryNameFormControl.value })
          .subscribe((res) => {
            if (res) {
              this.clickSave.emit();
            }
          });
      }
    }
  }

  public onCancel() {
    this.clickCancel.emit();
  }

  get categoryNameFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formAddNewCategory,
      this.formFields.categoryName
    );
  }

  get categoryNameErrorMessages() {
    return this._formService.getErrorMessage(
      this.formAddNewCategory,
      this.formFields.categoryName
    );
  }

  private fillForm() {
    if (this.isEdit) {
      this.formAddNewCategory.controls['categoryName'].setValue(
        this.categoryEdit.name
      );
    }
  }
}
