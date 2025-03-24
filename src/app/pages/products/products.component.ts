import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductItemComponent } from "../../shared/components/product-item/product-item.component";

@Component({
  selector: 'app-products',
  imports: [NgxPaginationModule, ProductItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  isOpen: boolean = false;
  selectedCatId: string = '0';
  categoryName: WritableSignal<string> = signal('All Products');
  isOpenMenu: boolean = false;
  results: WritableSignal<number> = signal(0);
  products: WritableSignal<IProduct[]> = signal([]);
  categories: WritableSignal<ICategory[]> = signal([]);
  page: WritableSignal<number> = signal(1);
  limit: WritableSignal<number> = signal(12);
  total: WritableSignal<number> = signal(0);
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }
  getAllProducts(): void {
    this.productsService.getAllProducts(this.page(), this.limit()).subscribe({
      next: (res) => {
        this.products.set(res.data);
        this.results.set(res.results);
        this.total.set(res.results);
      }
    });
  }
  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
      }
    })
  }
  toggleMenu(): void {
    this.isOpenMenu = !this.isOpenMenu;
  }
  selectedId(id: string, catName: string): void {
    this.selectedCatId = id;
    if (this.selectedCatId == '0') {
      this.getAllProducts();
    } else {
      this.filterdProductsByCategoryId(id, catName);
    }
  }
  filterdProductsByCategoryId(id: string, catName: string): void {
    this.productsService.getProductsByCategoryId(id, this.page(), this.limit()).subscribe({
      next: (res) => {
        this.products.set(res.data);
        this.results.set(res.results);
        this.total.set(res.results);
        this.categoryName.set(catName);
      }
    })
  }
  changePage(event: any): void {
    this.page.set(event);
    this.getAllProducts();
    this.filterdProductsByCategoryId(this.selectedCatId, this.categoryName());
  }
  toggleSettings(): void {
    this.isOpen = !this.isOpen;
  }
}
