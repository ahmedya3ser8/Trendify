import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) { }
  getAllCategories(): Observable<any> {
    return this.httpClient.get(`${environments.baseUrl}/categories`);
  }
}
