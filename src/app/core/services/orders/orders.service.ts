import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddress } from '../../../shared/interfaces/iaddress';
import { environments } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private httpClient: HttpClient) { }
  cashOrder(cartId: string, shippingAddress: IAddress): Observable<any> {
    return this.httpClient.post(`${environments.baseUrl}/orders/${cartId}`, {
      shippingAddress
    })
  }
  onlineOrder(cartId: string, shippingAddress: IAddress): Observable<any> {
    return this.httpClient.post(`${environments.baseUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200`, {
      shippingAddress
    })
  }
  getUserOrders(userId: string): Observable<any> {
    return this.httpClient.get(`${environments.baseUrl}/orders/user/${userId}`)
  }
}
