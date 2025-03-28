import { Component, computed, ElementRef, inject, OnDestroy, OnInit, Signal, signal, ViewChild, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  destory$: Subject<any> = new Subject();
  cartProducts: WritableSignal<ICart | null> = signal(null);
  cartNumber: Signal<number> = computed(() => this.cartService.cartNumber());
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  ngOnInit(): void {
    this.getAllCartProducts();
  }
  getAllCartProducts(): void {
    this.cartService.getAllCartProducts().pipe(takeUntil(this.destory$)).subscribe({
      next: (res) => {
        if (res.status === "success") {
          this.cartService.cartNumber.set(res.numOfCartItems);
          this.cartProducts.set(res.data);
        }
      }
    })
  }
  updateCartProductQuantity(productId: string, count: number): void {
    this.cartService.updateCartProductQuantity(productId, count).pipe(takeUntil(this.destory$)).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartProducts.set(res.data);
          this.toastrService.success('quantity updated successfully');
        }
      }
    })
  }
  removeCartProduct(productId: string): void {
    this.cartService.removeProductFromCart(productId).pipe(takeUntil(this.destory$)).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartService.cartNumber.set(res.numOfCartItems);
          this.cartProducts.set(res.data);
          this.toastrService.warning('Your product has been deleted.');
        }
      }
    })
  }
  clearCartProducts(): void {
    this.cartService.clearCart().pipe(takeUntil(this.destory$)).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.cartProducts.set(null);
          this.cartService.cartNumber.set(0);
          this.toastrService.warning('Your All Products has been deleted.');
        }
      }
    })
  }
  ngOnDestroy(): void {
    this.destory$.next('Done');
  }
}
