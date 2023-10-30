import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/interface/category.interface';
import { ItemMenuName } from 'src/app/interface/menu-item.interface';
import { Product } from 'src/app/interface/product.interface';
import { CategoryService } from 'src/app/service/category.service';
import { HttpService } from 'src/app/service/http.service';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private unSubcribe$: Subject<void> = new Subject<void>();
  public productList: Product[] = [];
  private categorySelected!: Category;

  constructor(
    private _categoryService: CategoryService,
    private _httpService: HttpService,
    private _menuService: MenuService
  ) {}

  ngOnInit(): void {
    this._menuService.setActiveMenu(ItemMenuName.HOME);
    this._categoryService.setCategorySelected = null;
    this.getListProductsByCategorySelected();
  }

  private getListProductsByCategorySelected() {
    this._categoryService.getCategorySelected
      .pipe(takeUntil(this.unSubcribe$))
      .subscribe((res) => {
        if (res) {
          this.categorySelected = res;
        }
        this.refreshListProducts();
      });
  }

  public refreshListProducts() {
    const url = `/product/get-by-category?id=${
      this.categorySelected ? this.categorySelected.id : ''
    }`;
    this._httpService.get<Product[]>(url).subscribe((res) => {
      if (res) {
        this.productList = res.map((item) => ({
          ...item,
          checked: false,
        }));
      }
    });
  }

  ngOnDestroy(): void {
    this.unSubcribe$.next();
    this.unSubcribe$.complete();
  }
}
