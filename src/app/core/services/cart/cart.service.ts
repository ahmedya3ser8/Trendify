import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartNumber: WritableSignal<number> = signal(0);
  constructor(private httpClient: HttpClient) { }
  addProductToCart(productId: string): Observable<any> {
    return this.httpClient.post(`${environments.baseUrl}/cart`, {
      productId: productId
    })
  }
  getAllCartProducts(): Observable<any> {
    return this.httpClient.get(`${environments.baseUrl}/cart`);
  }
  updateCartProductQuantity(productId: string, count: number): Observable<any> {
    return this.httpClient.put(`${environments.baseUrl}/cart/${productId}`, {
      count: count
    })
  }
  removeProductFromCart(productId: string): Observable<any> {
    return this.httpClient.delete(`${environments.baseUrl}/cart/${productId}`)
  }
  clearCart(): Observable<any> {
    return this.httpClient.delete(`${environments.baseUrl}/cart`)
  }
}
