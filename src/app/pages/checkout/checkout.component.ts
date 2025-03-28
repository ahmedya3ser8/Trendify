import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil, timer } from 'rxjs';
import { OrdersService } from '../../core/services/orders/orders.service';
import { ErrorMessageComponent } from "../../shared/components/error-message/error-message.component";

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit, OnDestroy {
  paymentMethod: string = 'online';
  addressForm!: FormGroup;
  cartId!: string;
  destory$: Subject<any> = new Subject();
  private readonly formBuilder = inject(FormBuilder);
  private readonly ordersService = inject(OrdersService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: [null, [Validators.required]]
    })
    this.cartId = this.activatedRoute.snapshot.paramMap.get('id')!;
  }
  completeCashOrder(): void {
    if (this.addressForm.valid) {
      this.ordersService.cashOrder(this.cartId, this.addressForm.value).pipe(takeUntil(this.destory$)).subscribe({
        next: (res) => {
          if (res.status === "success") {
            this.toastrService.success('order complete successfully');
            timer(2000).pipe(takeUntil(this.destory$)).subscribe(() => this.router.navigateByUrl('/cart'));
          }
        }
      })
    } else {
      this.addressForm.markAllAsTouched();
    }
  }
  completeOnlineOrder(): void {
    if (this.addressForm.valid) {
      this.ordersService.onlineOrder(this.cartId, this.addressForm.value).pipe(takeUntil(this.destory$)).subscribe({
        next: (res) => {
          if (res.status === "success") {
            open(res.session.url);
          }
        }
      })
    } else {
      this.addressForm.markAllAsTouched();
    }
  }
  payment(e: any) {
    if(e.target.value === 'cash') {
      this.paymentMethod = 'cash';
    } else {
      this.paymentMethod = 'online';
    }
  }
  submitForm() {
    if (this.paymentMethod === 'cash') {
      this.completeCashOrder();
    } else {
      this.completeOnlineOrder();
    }
  }
  ngOnDestroy(): void {
    this.destory$.next('Done');
  }
}
