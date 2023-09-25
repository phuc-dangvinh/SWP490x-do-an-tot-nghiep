import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/interface/category.interface';
import { FormService } from 'src/app/service/form.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.scss'],
})
export class AddNewCategoryComponent implements OnInit {
  public newCategoryName: string = '';
  public isErrorInput: boolean = false;
  public addNewCategoryForm!: FormGroup;
  private formFields = {
    categoryName: 'categoryName',
  };

  constructor(
    private _httpService: HttpService,
    private _formService: FormService
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public addNewCategory() {
    if (this.newCategoryName) {
      const url = '/category/manage/add-new';
      this._httpService
        .post<Category>(url, { name: this.newCategoryName })
        .subscribe((res) => {
          if (res) {
          }
        });
    }
  }

  get categoryNameFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.addNewCategoryForm,
      this.formFields.categoryName
    );
  }

  get categoryNameErrorMessages() {
    return this._formService.getErrorMessage(
      this.addNewCategoryForm,
      this.formFields.categoryName
    );
  }
}
