import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { IOrder } from '../../shared/interfaces/iorder';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-order',
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit, OnDestroy {
  destory$: Subject<any> = new Subject();
  orders: WritableSignal<IOrder[]> = signal([]);
  private readonly ordersService = inject(OrdersService);
  private readonly authService = inject(AuthService);
  ngOnInit(): void {
    this.authService.userData.subscribe({
      next: (res) => {
        this.ordersService.getUserOrders(res.id).pipe(takeUntil(this.destory$)).subscribe({
          next: (res) => {
            this.orders.set(res);
          }
        })
      }
    })
  }
  ngOnDestroy(): void {
    this.destory$.next('Done');
  }
}
