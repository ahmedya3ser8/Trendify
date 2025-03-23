import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products$: Observable<any> | null = null;
  constructor(private httpClient: HttpClient) { }
  getProductsByCategoryId(id: string, page: number, limit: number): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products`, {
      params: {
        'category[in]': id,
        page,
        limit
      }
    });
  }
  getAllProducts(page: number, limit: number): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products`, {
      params: {
        page,
        limit
      }
    });
  }
  getStaticProducts(): Observable<any> {
    if(!this.products$) {
      this.products$ = this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products`).pipe(
        shareReplay(1)
      )
    }
    return this.products$;
  }
  getProductById(id: string): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
}
