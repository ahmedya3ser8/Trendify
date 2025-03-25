import { Component } from '@angular/core';
import { DetailsComponent } from "./components/details/details.component";
import { ReviewsComponent } from "./components/reviews/reviews.component";
import { SimilarProductsComponent } from "../../shared/components/similar-products/similar-products.component";

@Component({
  selector: 'app-product-details',
  imports: [ReviewsComponent, DetailsComponent, SimilarProductsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

}
