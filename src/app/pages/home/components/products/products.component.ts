import { CartService } from '../../../../service/cart.service';
import { Component } from '@angular/core';
import { PRODUCTS } from '../../../../data/products.data';
import { Product } from '../../../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products = PRODUCTS;

  constructor(private cartService: CartService) {}

  onAdd(product: Product) {
    this.cartService.addItem({
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: 1,
    });
  }
}
