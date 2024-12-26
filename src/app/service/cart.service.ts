import { Injectable, signal } from '@angular/core';

import { Cart } from '../models/cart.model';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Cart>({
    items: [] as CartItem[],
    count: 0,
    total: 0,
  });

  constructor() {}

  addItem(item: CartItem): void {
    const itemExist = this.cart().items.find(
      (inCartItem) => inCartItem.id === item.id
    );

    if (itemExist) {
      this.increaseItem(itemExist);
    } else {
      this.cart.update((prevCartState) => ({
        ...prevCartState,
        items: [...prevCartState.items, item],
        count: prevCartState.count + 1,
        total: prevCartState.total + item.price,
      }));
    }
  }

  increaseItem(item: CartItem) {
    this.cart.update((prevCartState) => {
      const newCart = {
        ...prevCartState,
        items: [...prevCartState.items],
      };

      const itemExist = newCart.items.find(
        (existItem) => existItem.id === item.id
      );

      itemExist!.quantity = itemExist!.quantity + 1;
      newCart.count++;
      newCart.total += itemExist!.price;
      return newCart;
    });
  }

  decreaseItem(item: CartItem) {
    this.cart.update((prevCartState) => {
      const newCart = {
        ...prevCartState,
        items: [...prevCartState.items],
      };

      const itemExist = newCart.items.find(
        (existItem) => existItem.id === item.id
      );

      itemExist!.quantity = itemExist!.quantity - 1;
      newCart.count--;
      newCart.total -= itemExist!.price;
      return newCart;
    });
  }

  removeItem(item: CartItem) {
    this.cart.update((prevCartState) => {
      const newCart = {
        ...prevCartState,
        items: [
          ...prevCartState.items.filter(
            (existItem) => existItem.id !== item.id
          ),
        ],
      };

      const itemExist = prevCartState.items.find(
        (existItem) => existItem.id === item.id
      );

      newCart.count -= itemExist!.quantity;
      newCart.total -= itemExist!.price * itemExist!.quantity;
      return newCart;
    });
  }
}
