import { CartItem } from './cart-item.model';

export interface Cart {
  items: CartItem[];
  count: number;
  total: number;
}
