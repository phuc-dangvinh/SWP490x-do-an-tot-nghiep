import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category } from 'src/app/interface/category.interface';
import { HttpService } from 'src/app/service/http.service';
import { AddNewCategoryComponent } from '../pop-up/add-new-category/add-new-category.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category-left-side',
  templateUrl: './category-left-side.component.html',
  styleUrls: ['./category-left-side.component.scss'],
  providers: [DialogService, MessageService],
})
export class CategoryLeftSideComponent implements OnInit, OnDestroy {
  public listCategories: Category[] = [];
  public selectedCategory!: Category;
  public ref: DynamicDialogRef | undefined;

  constructor(
    private dialogService: DialogService,
    private httpService: HttpService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getListCategories();
  }

  public showPopupAddNewCategory() {
    this.ref = this.dialogService.open(AddNewCategoryComponent, {
      header: 'Add new Category',
      width: '50%',
    });
    this.ref.onClose.subscribe(() => {
      this.getListCategories();
    });
  }

  public onChangeSelectCategory() {
    console.log('onChangeSelectCategory: ', this.selectedCategory);
  }

  private getListCategories() {
    const url = '/category/manage/get-all';
    this.httpService.get<Category[]>(url).subscribe((res) => {
      if (res) {
        this.listCategories = res;
      }
    });
  }

  public test() {
    console.log('vào test');
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.destroy();
    }
  }
}
