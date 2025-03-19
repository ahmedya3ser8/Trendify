import { Component, inject, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../../../shared/interfaces/iproduct';
import { ProductsService } from '../../../../core/services/products/products.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home-top-products',
  imports: [],
  templateUrl: './home-top-products.component.html',
  styleUrl: './home-top-products.component.scss'
})
export class HomeTopProductsComponent {
products: WritableSignal<IProduct[]> = signal([]);
  private readonly productsService = inject(ProductsService);
  ngOnInit(): void {
    this.productsService.getAllProducts().pipe(map(products => products.data.slice(0,8))).subscribe({
      next: (res) => {
        this.products.set(res);
      }
    })
  }
}
