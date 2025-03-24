import { Component, input, InputSignal, signal } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  product: InputSignal<IProduct> = input.required<IProduct>();
}
