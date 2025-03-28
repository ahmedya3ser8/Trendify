import { Component, inject, input, InputSignal, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { isPlatformBrowser } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit, OnDestroy {
  productIds: string[] = [];
  destory$: Subject<any> = new Subject();
  product: InputSignal<IProduct> = input.required<IProduct>();
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const ids = localStorage.getItem("productIds");
      if(ids) {
        this.productIds = JSON.parse(ids);
      }
    }
  }
  addToCart(productId: string): void {
    this.cartService.addProductToCart(productId).pipe(takeUntil(this.destory$)).subscribe({
      next: (res) => {
        if (res.status === "success") {
          this.cartService.cartNumber.set(res.numOfCartItems);
          this.toastrService.success(res.message);
        }
      }
    })
  }
  addProductToWishlist(productId: string): void {
    this.wishlistService.addProductToWishlist(productId).pipe(takeUntil(this.destory$)).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.wishlistService.wishlistNumber.set(res.data.length);
          this.productIds = res.data || [];
          localStorage.setItem('productIds', JSON.stringify(this.productIds));
          this.toastrService.success(res.message);
        }
      }
    })
  }
  removeProductFromWishlist(productId: string): void {
    this.wishlistService.removeProductFromWishlist(productId).pipe(takeUntil(this.destory$)).subscribe({
      next: (res) => {
        if (res.status === "success") {
          this.wishlistService.wishlistNumber.set(res.data.length);
          this.productIds = res.data || [];
          localStorage.setItem('productIds', JSON.stringify(this.productIds));
          this.toastrService.success(res.message);
        }
      }
    })
  }
  ngOnDestroy(): void {
    this.destory$.next("Done");
  }
}
