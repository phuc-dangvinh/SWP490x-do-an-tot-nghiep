import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Category } from 'src/app/interface/category.interface';
import { HttpService } from 'src/app/service/http.service';
import { AddNewCategoryComponent } from '../../pop-up/add-new-category/add-new-category.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @ViewChild('addNewCategory') addNewCategory:
    | TemplateRef<AddNewCategoryComponent>
    | undefined;
  public listCategories: Category[] = [];

  constructor(
    private _httpService: HttpService,
    private _modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getListCategories();
  }

  private getListCategories() {
    const url = '/category/manage/get-all';
    this._httpService.get<Category[]>(url).subscribe((res) => {
      if (res) {
        this.listCategories = res;
      }
    });
  }

  public addCategory() {
    console.log('addCategory');
    this._modalService.open(this.addNewCategory, { size: 'lg' });
  }

  public editCategory(id: string) {
    console.log('editCategory: ', id);
  }

  public deleteCategory(id: string) {
    console.log('deleteCategory: ', id);
  }
}
