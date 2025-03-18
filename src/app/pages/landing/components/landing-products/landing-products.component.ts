import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../../../shared/interfaces/iproduct';
import { ProductsService } from '../../../../core/services/products/products.service';
import { map } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-products',
  imports: [RouterLink],
  templateUrl: './landing-products.component.html',
  styleUrl: './landing-products.component.scss'
})
export class LandingProductsComponent implements OnInit {
  selectedCatId: string = '';
  categories = signal([
    {name: 'All', id: ''},
    {name: "Men's", id: '6439d5b90049ad0b52b90048'},
    {name: "Women's", id: '6439d58a0049ad0b52b9003f'},
    {name: 'Electronics', id: '6439d2d167d9aa4ca970649f'}
  ]);
  products: WritableSignal<IProduct[]> = signal([]);
  private readonly productsService = inject(ProductsService);
  ngOnInit(): void {
    this.filterdProductsByCategoryId('6439d58a0049ad0b52b9003f');
  }
  selectedId(id: string): void {
    this.selectedCatId = id;
    if (id === '') {
      this.filterdProductsByCategoryId('6439d58a0049ad0b52b9003f');
    } else {
      this.filterdProductsByCategoryId(id);
    }
  }
  filterdProductsByCategoryId(id: string): void {
    this.productsService.getProductsByCategoryId(id).pipe(map(products => products.data.slice(0,4))).subscribe({
      next: (res) => {
        this.products.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
