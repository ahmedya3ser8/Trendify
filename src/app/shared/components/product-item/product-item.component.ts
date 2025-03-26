import { Component, inject, input, InputSignal, signal } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  product: InputSignal<IProduct> = input.required<IProduct>();
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  addToCart(productId: string): void {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        if (res.status === "success") {
          console.log(res.numOfCartItems);
          this.cartService.cartNumber.set(res.numOfCartItems);
          this.toastrService.success(res.message);
        }
      }
    })
  }
}
