import { Component, ViewEncapsulation } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category } from 'src/app/interface/category.interface';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddNewCategoryComponent {
  public newCategoryName: string = '';
  public isErrorInput: boolean = false;

  constructor(private httpService: HttpService, public ref: DynamicDialogRef) {}

  public onFocusInput() {
    this.isErrorInput = false;
  }

  public onBlurInput() {
    if (!this.newCategoryName) {
      this.isErrorInput = true;
    }
  }

  public addNewCategory() {
    this.onBlurInput();
    if (this.newCategoryName) {
      const url = '/category/manage/add-new';
      this.httpService
        .post<Category>(url, { name: this.newCategoryName })
        .subscribe((res) => {
          if (res) {
            this.ref.close();
          }
        });
    }
  }
}
