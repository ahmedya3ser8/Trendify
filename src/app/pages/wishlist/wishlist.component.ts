import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  wishlistNumber: Signal<number> = computed(() => this.wishlistService.wishlistNumber());
  products: WritableSignal<IProduct[]> = signal([]);
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  ngOnInit(): void {
    this.getAllWishlistProducts();
  }
  getAllWishlistProducts(): void {
    this.wishlistService.getAllWishlistProducts().subscribe({
      next: (res) => {
        if (res.status === "success") {
          this.wishlistService.wishlistNumber.set(res.count);
          this.products.set(res.data);
        }
      }
    })
  }
  addToCart(productId: string): void {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        if (res.status === "success") {
          this.cartService.cartNumber.set(res.numOfCartItems);
          this.toastrService.success(res.message);
          this.removeProductFromWishlist(productId);
          this.getAllWishlistProducts();
        }
      }
    })
  }
  removeProductFromWishlist(productId: string): void {
    this.wishlistService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {
        if (res.status === "success") {
          this.wishlistService.wishlistNumber.set(res.data.length);
          let productIds: string[] = res.data;
          localStorage.setItem('productIds', JSON.stringify(productIds));
          this.toastrService.warning(res.message);
          this.getAllWishlistProducts();
        }
      }
    })
  }
}
