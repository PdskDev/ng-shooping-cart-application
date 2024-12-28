import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CartItem } from '../../../../models/cart-item.model';

@Component({
  selector: 'app-cart-item-card',
  standalone: true,
  imports: [],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.css',
})
export class CartItemCardComponent {
  @Input() item!: CartItem;
  @Output() itemQuantityUpdate = new EventEmitter<number>();
  @Output() removeItem = new EventEmitter<void>();

  onQuantityChange(quantity: number) {
    this.itemQuantityUpdate.next(quantity);
  }

  onRemoveItem() {
    this.removeItem.next();
  }
}
