import { Component, computed } from '@angular/core';

import { CartItemCardComponent } from './components/cart-item-card/cart-item-card.component';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemCardComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  count = computed(() => this.cartService.cart().count);
  total = computed(() => this.cartService.cart().total);
  items = computed(() => this.cartService.cart().items);

  constructor(private cartService: CartService) {}

  onItemQuantityUpdate(quantity: number, id: string) {
    let increase = true;

    const existItem = this.items().find((i) => i.id === id);

    if (quantity < existItem!.quantity) increase = false;

    if (increase) {
      this.cartService.increaseItem(existItem!);
    } else {
      this.cartService.decreaseItem(existItem!);
    }
  }

  onRemoveItem(id: string) {
    const existItem = this.items().find((i) => i.id === id);
    this.cartService.removeItem(existItem!);
  }
}
