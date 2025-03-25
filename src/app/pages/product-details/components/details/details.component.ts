import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../core/services/products/products.service';
import { IProduct } from '../../../../shared/interfaces/iproduct';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  imageCover: string = "https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg";
  colorName: string = 'Blue';
  sizeName: string = 'Medium';
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
  ngOnInit(): void {
    this.getSpecificProduct();
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
}
