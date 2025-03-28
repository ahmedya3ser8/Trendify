import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../../../shared/interfaces/iproduct';
import { ProductsService } from '../../../../core/services/products/products.service';
import { map, Subject, takeUntil } from 'rxjs';
import { ProductItemComponent } from "../../../../shared/components/product-item/product-item.component";

@Component({
  selector: 'app-home-sale',
  imports: [ProductItemComponent],
  templateUrl: './home-sale.component.html',
  styleUrl: './home-sale.component.scss'
})
export class HomeSaleComponent implements OnInit, OnDestroy {
  destory$: Subject<any> = new Subject();
  products: WritableSignal<IProduct[]> = signal([]);
  private readonly productsService = inject(ProductsService);
  ngOnInit(): void {
    this.productsService.getStaticProducts().pipe(map(products => products.data.slice(0,4)), takeUntil(this.destory$)).subscribe({
      next: (res) => {
        this.products.set(res);
      }
    })
  }
  ngOnDestroy(): void {
    this.destory$.next('Done');
  }
}
