import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../../../shared/interfaces/iproduct';
import { ProductsService } from '../../../../core/services/products/products.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home-sale',
  imports: [],
  templateUrl: './home-sale.component.html',
  styleUrl: './home-sale.component.scss'
})
export class HomeSaleComponent implements OnInit {
  products: WritableSignal<IProduct[]> = signal([]);
  private readonly productsService = inject(ProductsService);
  ngOnInit(): void {
    this.productsService.getAllProducts().pipe(map(products => products.data.slice(0,4))).subscribe({
      next: (res) => {
        this.products.set(res);
      }
    })
  }
}
