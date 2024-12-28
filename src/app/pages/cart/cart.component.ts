import { Component, computed } from '@angular/core';

import { CartItemCardComponent } from './components/cart-item-card/cart-item-card.component';
import { CartService } from '../../service/cart.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { loadStripe } from './../../../../node_modules/@stripe/stripe-js/src/index';

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

  constructor(private cartService: CartService, private http: HttpClient) {}

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

  async onCheckout() {
    const stripe = await loadStripe(environment.STRIPE_PK);
    const body = this.cartService.cart().items;
    const headers = { 'Content-Type': 'application/json' };

    this.http
      .post('http://localhost:3000/api/create-checkout-session', body, {
        headers: headers,
      })
      .subscribe({
        next: async (response) => {
          const session = response as any;
          const result = await stripe?.redirectToCheckout({
            sessionId: session.id,
          });

          if (result?.error) {
            console.error(result.error);
          }
        },
        error: (response) => {
          if (response?.error) {
            console.error(response.error);
          }
        },
      });
  }
}
