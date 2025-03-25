import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { ProductsService } from '../../../core/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { ProductItemComponent } from "../product-item/product-item.component";

@Component({
  selector: 'app-similar-products',
  imports: [ProductItemComponent],
  templateUrl: './similar-products.component.html',
  styleUrl: './similar-products.component.scss'
})
export class SimilarProductsComponent implements OnInit {
  products: WritableSignal<IProduct[]> = signal([]);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  ngOnInit(): void {
    this.getSpecificProduct();
  }
  getSpecificProduct(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        let currentId = String(res.get('id'));
        this.productsService.getProductById(currentId).subscribe({
          next: (res) => {
            this.getProductsByCategoryId(res.data.category._id);
          }
        })
      }
    })
  }
  getProductsByCategoryId(id: string): void {
    this.productsService.getProductsByCategoryId(id, 1, 4).subscribe({
      next: (res) => {
        this.products.set(res.data);
      }
    })
  }
}
