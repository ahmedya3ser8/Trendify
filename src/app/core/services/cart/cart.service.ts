import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartNumber: WritableSignal<number> = signal(0);
  constructor(private httpClient: HttpClient) { }
  addProductToCart(productId: string): Observable<any> {
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
      productId: productId
    })
  }
  getAllCartProducts(): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`);
  }
  updateCartProductQuantity(productId: string, count: number): Observable<any> {
    return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      count: count
    })
  }
  removeProductFromCart(productId: string): Observable<any> {
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`)
  }
  clearCart(): Observable<any> {
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`)
  }
}
