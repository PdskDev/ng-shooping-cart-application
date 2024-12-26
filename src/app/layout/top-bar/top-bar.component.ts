import { Component, computed } from '@angular/core';

import { CartService } from '../../service/cart.service';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  imports: [RouterLink, DecimalPipe],
  standalone: true,
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent {
  total = computed(() => this.cartService.cart().total);
  count = computed(() => this.cartService.cart().count);

  constructor(private cartService: CartService) {}
}
