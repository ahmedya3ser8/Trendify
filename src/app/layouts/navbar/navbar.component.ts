import { Component, computed, HostListener, inject, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';

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
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  ngOnInit(): void {
    this.getUserData();
    this.getAllCartProducts();
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
