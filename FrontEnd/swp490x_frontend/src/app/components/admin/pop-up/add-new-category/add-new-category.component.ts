import { Component, ViewEncapsulation } from '@angular/core';
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

  constructor(private httpService: HttpService) {}

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
      console.log('process addNewCategory');
      const url = '/category/manage/add-new';
      this.httpService
        .post<Category>(url, { name: this.newCategoryName })
        .subscribe((res) => {
          console.log('result add new Category', res);
          if (res) {
          }
        });
    }
  }
}
