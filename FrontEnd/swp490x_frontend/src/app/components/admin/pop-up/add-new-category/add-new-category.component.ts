import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddNewCategoryComponent {
  public newCategoryName: string = '';
  public isErrorInput: boolean = false;

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
    }
  }
}
