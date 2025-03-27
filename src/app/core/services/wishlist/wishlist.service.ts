import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlistNumber: WritableSignal<number> = signal(0);
  constructor(private httpClient: HttpClient) { }
  addProductToWishlist(productId: string): Observable<any> {
    return this.httpClient.post(`${environments.baseUrl}/wishlist`, {
      productId: productId
    })
  }
  removeProductFromWishlist(productId: string): Observable<any> {
    return this.httpClient.delete(`${environments.baseUrl}/wishlist/${productId}`);
  }
  getAllWishlistProducts(): Observable<any> {
    return this.httpClient.get(`${environments.baseUrl}/wishlist`);
  }
}
