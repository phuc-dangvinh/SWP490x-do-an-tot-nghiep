import { Category } from './category.interface';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageProducts: ImageProduct[];
  category: Category;
}

export interface ImageProduct {
  id: string;
  fileName: string;
}

export interface ImageProductPendingAction {
  add: ImageProduct[];
  delete: ImageProduct[];
}
