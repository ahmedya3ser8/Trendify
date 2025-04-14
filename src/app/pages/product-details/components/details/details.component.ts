import { Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../core/services/products/products.service';
import { IProduct } from '../../../../shared/interfaces/iproduct';
import { CartService } from '../../../../core/services/cart/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../../core/services/wishlist/wishlist.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {
  imageCover: string = "https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg";
  colorName: string = 'Blue';
  sizeName: string = 'Medium';
  productIds: string[] = [];
  destory$: Subject<any> = new Subject();
  colors = [
    {name: 'Blue', color: '#507ccd'},
    {name: 'White', color: '#fff'},
    {name: 'Brown', color: '#c88242'},
    {name: 'Black', color: '#000'},
    {name: 'Soft Clay', color: '#dcb9a8'},
    {name: 'Misty Olive', color: '#a7b2a3'}
  ];
  sizes = [
    {name: 'Extra Small', size: 'XS'},
    {name: 'Small', size: 'S'},
    {name: 'Medium', size: 'M'},
    {name: 'Large', size: 'L'},
    {name: 'Extra Large', size: 'XL'},
    {name: 'Double Extra Large', size: 'XXL'},
    {name: 'Triple Extra Large', size: 'XXXL'}
  ];
  productItem: WritableSignal<IProduct> = signal({} as IProduct);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  ngOnInit(): void {
    this.getSpecificProduct();
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const ids = localStorage.getItem("productIds");
      if(ids) {
        this.productIds = JSON.parse(ids);
      }
    }
  }
  getSpecificProduct(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        let currentId = String(res.get('id'));
        this.productsService.getProductById(currentId).subscribe({
          next: (res) => {
            this.productItem.set(res.data);
          }
        })
      }
    })
  }
  selectedImg(img: string): void {
    this.imageCover = img;
  }
  selectedColor(name: string): void {
    this.colorName = name;
  }
  selectedSize(name: string): void {
    this.sizeName = name;
  }
  addToCart(productId: string): void {
    this.cartService.addProductToCart(productId).pipe(takeUntil(this.destory$)).subscribe({
      next: (res) => {
        if (res.status === "success") {
          this.cartService.cartNumber.set(res.numOfCartItems);
          this.toastrService.success(res.message);
        }
      }
    })
  }
  addProductToWishlist(productId: string): void {
    this.wishlistService.addProductToWishlist(productId).pipe(takeUntil(this.destory$)).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.wishlistService.wishlistNumber.set(res.data.length);
          this.productIds = res.data || [];
          localStorage.setItem('productIds', JSON.stringify(this.productIds));
          this.toastrService.success(res.message);
        }
      }
    })
  }
  removeProductFromWishlist(productId: string): void {
    this.wishlistService.removeProductFromWishlist(productId).pipe(takeUntil(this.destory$)).subscribe({
      next: (res) => {
        if (res.status === "success") {
          this.wishlistService.wishlistNumber.set(res.data.length);
          this.productIds = res.data || [];
          localStorage.setItem('productIds', JSON.stringify(this.productIds));
          this.toastrService.success(res.message);
        }
      }
    })
  }
  ngOnDestroy(): void {
    this.destory$.next("Done");
  }
}
