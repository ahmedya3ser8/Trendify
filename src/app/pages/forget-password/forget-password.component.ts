import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ErrorMessageComponent } from "../../shared/components/error-message/error-message.component";
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [CarouselModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  step: WritableSignal<number> = signal(1);
  sliderImgs: WritableSignal<string[]> = signal(['/images/auth-slider-1.png', '/images/auth-slider-2.png', '/images/auth-slider-3.png'])
  msgError: WritableSignal<string> = signal('');
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
  verifyEmailForm!: FormGroup;
  verifyCodeForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  ngOnInit(): void {
    this.verifyEmailForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });
    this.verifyCodeForm = this.formBuilder.group({
      resetCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
    });
    this.resetPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{7,}$/)]]
    });
  }
  submitVerifyEmail(): void {
    const emailValue = this.verifyEmailForm.get('email')?.value;
    this.resetPasswordForm.get('email')?.patchValue(emailValue);
    this.msgError.set('');
    if (this.verifyEmailForm.valid) {
      this.authService.verifyEmail(this.verifyEmailForm.value).subscribe({
        next: (res) => {
          if (res.statusMsg === 'success') {
            this.step.set(2);
          }
        },
        error: (err) => {
          this.msgError.set(err.split(' ', 9).join(' '));
        }
      })
    } else {
      this.verifyEmailForm.markAllAsTouched();
    }
  }
  submitverifyCode(): void {
    this.msgError.set('');
    if (this.verifyCodeForm.valid) {
      this.authService.verifyCode(this.verifyCodeForm.value).subscribe({
        next: (res) => {
          if (res.status === 'Success') {
            this.step.set(3);
          }
        },
        error: (err) => {
          this.msgError.set(err);
        }
      })
    } else {
      this.verifyCodeForm.markAllAsTouched();
    }
  }
  submitresetPassword(): void {
    this.msgError.set('');
    if (this.resetPasswordForm.valid) {
      this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (res) => {
          localStorage.setItem("user-token", res.token);
          this.authService.saveUserData();
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          this.msgError.set(err);
        }
      })
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }
}
