import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CarouselModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
sliderImgs: WritableSignal<string[]> = signal(['/images/auth-slider-1.png', '/images/auth-slider-2.png', '/images/auth-slider-3.png'])
  msgError: WritableSignal<string> = signal('');
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  loginForm!: FormGroup;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)]]
    });
  }
  submitForm(): void {
    if (this.loginForm.valid) {
      this.msgError.set('');
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === "success") {
            localStorage.setItem('user-token', res.token);
            this.authService.getUserData();
            this.router.navigateByUrl('/home');
          }
        },
        error: (err) => {
          this.msgError.set(err);
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
