import { Category } from './category.interface';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageProducts: ImageProduct[];
  category: Category;
  checked: boolean;
}

export interface ImageProduct {
  id: string;
  fileName: string;
}
