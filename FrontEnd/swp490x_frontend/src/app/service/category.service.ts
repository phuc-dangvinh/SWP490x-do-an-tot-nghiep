import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../interface/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesList$: BehaviorSubject<Category[] | null> =
    new BehaviorSubject<Category[] | null>(null);
  private categorySelected$: BehaviorSubject<Category | null> =
    new BehaviorSubject<Category | null>(null);

  constructor() {}

  get getCategoriesList() {
    return this.categoriesList$;
  }

  set setCategoriesList(categories: Category[]) {
    this.categoriesList$.next(categories);
  }

  get getCategorySelected() {
    return this.categorySelected$;
  }

  set setCategorySelected(category: Category) {
    this.categorySelected$.next(category);
  }
}
