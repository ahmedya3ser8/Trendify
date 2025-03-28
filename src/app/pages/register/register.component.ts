import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions  } from 'ngx-owl-carousel-o';
import { ErrorMessageComponent } from "../../shared/components/error-message/error-message.component";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CarouselModule, RouterLink, ErrorMessageComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  destory$: Subject<any> = new Subject();
  sliderImgs: WritableSignal<string[]> = signal(['/images/auth-slider-1.png', '/images/auth-slider-2.png', '/images/auth-slider-3.png'])
  msgError: WritableSignal<string> = signal('');
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  registerForm!: FormGroup;
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
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)]],
      rePassword: [null, [Validators.required]],
      phone: ['01001234541']
    }, {validators: this.confirmPassword});
  }
  submitForm(): void {
    if (this.registerForm.valid) {
      this.msgError.set('');
      this.authService.signUp(this.registerForm.value).pipe(takeUntil(this.destory$)).subscribe({
        next: (res) => {
          if (res.message === "success") {
            this.router.navigateByUrl('/auth/login');
          }
        },
        error: (err) => {
          this.msgError.set(err);
        }
      })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : {mismatch: true}
  }
  ngOnDestroy(): void {
    this.destory$.next('Done');
  }
}
