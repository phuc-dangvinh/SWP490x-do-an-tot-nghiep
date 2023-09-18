import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category } from 'src/app/interface/category.interface';
import { HttpService } from 'src/app/service/http.service';
import { AddNewCategoryComponent } from '../pop-up/add-new-category/add-new-category.component';

@Component({
  selector: 'app-category-left-side',
  templateUrl: './category-left-side.component.html',
  styleUrls: ['./category-left-side.component.scss'],
  providers: [DialogService],
})
export class CategoryLeftSideComponent implements OnInit, OnDestroy {
  public listCategories: Category[] = [];
  public selectedCategory!: Category;
  public ref: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.getListCategories();
  }

  public addNewCategory() {
    this.ref = this.dialogService.open(AddNewCategoryComponent, {
      header: 'Add new Category',
      width: '50%',
    });
  }

  public onChangeSelectCategory() {
    console.log('onChangeSelectCategory: ', this.selectedCategory);
  }

  private getListCategories() {
    const url = '/category/manage/get-all';
    this.httpService.get<Category[]>(url).subscribe((res) => {
      console.log('getListCategories', res);
      if (res) {
        this.listCategories = res;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
