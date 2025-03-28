import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../interfaces/iproduct';
import { ProductsService } from '../../../core/services/products/products.service';
import { map, Subject, takeUntil } from 'rxjs';
import { ProductItemComponent } from "../product-item/product-item.component";

@Component({
  selector: 'app-special-products',
  imports: [RouterLink, ProductItemComponent],
  templateUrl: './special-products.component.html',
  styleUrl: './special-products.component.scss'
})
export class SpecialProductsComponent implements OnInit, OnDestroy {
  destory$: Subject<any> = new Subject();
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
    this.productsService.getProductsByCategoryId(id, 1, 12).pipe(map(products => products.data.slice(0,4)), takeUntil(this.destory$)).subscribe({
      next: (res) => {
        this.products.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  ngOnDestroy(): void {
    this.destory$.next("Done");
  }
}
