import { Category } from './category.interface';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: ImageProduct[];
  category: Category;
}

export interface ImageProduct {
  id: string;
  fileName: string;
}
