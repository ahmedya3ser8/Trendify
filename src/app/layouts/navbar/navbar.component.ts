import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogin: any;
  isScroll: boolean = false;
  private readonly authService = inject(AuthService);
  ngOnInit(): void {
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
