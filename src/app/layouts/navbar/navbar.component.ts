import { Component, computed, HostListener, inject, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogin: any;
  isScroll: boolean = false;
  cartNumber: Signal<number> = computed(() => this.cartService.cartNumber());
  wishlistNumber: Signal<number> = computed(() => this.wishlistService.wishlistNumber());
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  ngOnInit(): void {
    this.getUserData();
    this.getAllCartProducts();
    this.getAllWishlistProducts();
  }
  getAllWishlistProducts(): void {
    this.wishlistService.getAllWishlistProducts().subscribe({
      next: (res) => {
        this.wishlistService.wishlistNumber.set(res.count);
      }
    })
  }
  getAllCartProducts(): void {
    this.cartService.getAllCartProducts().subscribe({
      next: (res) => {
        if (res.status === "success") {
          this.cartService.cartNumber.set(res.numOfCartItems);
        }
      }
    })
  }
  getUserData(): void {
    this.authService.userData.subscribe({
      next: (res) => {
        this.isLogin = res;
      }
    })
  }
  logout(): void {
    this.authService.logout();
  }
  @HostListener('window:scroll') onScroll() {
    scrollY > 0 ? this.isScroll = true : this.isScroll = false;
  }
}
