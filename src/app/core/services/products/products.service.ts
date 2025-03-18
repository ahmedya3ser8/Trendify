import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient) { }
  getProductsByCategoryId(id: string): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products`, {
      params: {
        'category[in]': id
      }
    });
  }
}
