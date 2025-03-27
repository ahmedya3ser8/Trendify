import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { environments } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products$: Observable<any> | null = null;
  constructor(private httpClient: HttpClient) { }
  getProductsByCategoryId(id: string, page: number, limit: number): Observable<any> {
    return this.httpClient.get(`${environments.baseUrl}/products`, {
      params: {
        'category[in]': id,
        page,
        limit
      }
    });
  }
  getAllProducts(page: number, limit: number): Observable<any> {
    return this.httpClient.get(`${environments.baseUrl}/products`, {
      params: {
        page,
        limit
      }
    });
  }
  getStaticProducts(): Observable<any> {
    if(!this.products$) {
      this.products$ = this.httpClient.get(`${environments.baseUrl}/products`).pipe(
        shareReplay(1)
      )
    }
    return this.products$;
  }
  getProductById(id: string): Observable<any> {
    return this.httpClient.get(`${environments.baseUrl}/products/${id}`);
  }
}
