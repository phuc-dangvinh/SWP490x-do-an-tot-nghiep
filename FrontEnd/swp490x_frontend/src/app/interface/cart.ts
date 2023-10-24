import { Product } from './product.interface';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export enum QuantityAction {
  INCREASE,
  DECREASE,
}
