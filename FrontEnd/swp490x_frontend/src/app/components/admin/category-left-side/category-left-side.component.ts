import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category } from 'src/app/interface/category.interface';
import { AddNewCategoryComponent } from '../pop-up/add-new-category/add-new-category.component';

@Component({
  selector: 'app-category-left-side',
  templateUrl: './category-left-side.component.html',
  styleUrls: ['./category-left-side.component.scss'],
})
export class CategoryLeftSideComponent implements OnInit, OnDestroy {
  public listCategories: Category[] = [];
  public selectedCategory!: Category;
  public ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {
    this.listCategories = [
      {
        id: '5422f3fa-39e7-497f-863a-09e6b0b3e708',
        name: 'Overhead Doors',
      },
      {
        id: '6ab6e695-3746-426b-bd5d-fd785f43890e',
        name: 'Masonry & Precast',
      },
      {
        id: '9af488d1-a42f-4b26-8528-2536ea5e13bd',
        name: 'Termite Control',
      },
      {
        id: '72dec1c1-3eb6-4439-8741-7776ea0007b5',
        name: 'Site Furnishings',
      },
      {
        id: 'c2dd22a8-5abb-4373-8299-e8c1201ebe06',
        name: 'RF Shielding',
      },
    ];
  }

  public addNewCategory() {
    console.log('addNewCategory');
    this.ref = this.dialogService.open(AddNewCategoryComponent, {
      header: 'Add new Category',
      width: '70%',
    });
  }

  public onChangeSelectCategory() {
    console.log('onChangeSelectCategory: ', this.selectedCategory);
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
