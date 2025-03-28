import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../../core/services/auth/auth.service';
import { ErrorMessageComponent } from "../../shared/components/error-message/error-message.component";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CarouselModule, RouterLink, ErrorMessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  destory$: Subject<any> = new Subject();
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
      this.authService.signIn(this.loginForm.value).pipe(takeUntil(this.destory$)).subscribe({
        next: (res) => {
          if (res.message === "success") {
            localStorage.setItem('user-token', res.token);
            this.authService.saveUserData();
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
  ngOnDestroy(): void {
    this.destory$.next('Done');
  }
}
