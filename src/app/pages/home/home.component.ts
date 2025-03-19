import { Component } from '@angular/core';
import { HomeHeroComponent } from "./components/home-hero/home-hero.component";
import { HomeCategoriesComponent } from "./components/home-categories/home-categories.component";
import { HomeSliderComponent } from "./components/home-slider/home-slider.component";
import { HomeSaleComponent } from "./components/home-sale/home-sale.component";
import { HomeNewCollectionComponent } from "./components/home-new-collection/home-new-collection.component";
import { SpecialProductsComponent } from "../../shared/components/special-products/special-products.component";
import { SpecialDiscoverComponent } from "../../shared/components/special-discover/special-discover.component";
import { SpecialServicesComponent } from "../../shared/components/special-services/special-services.component";
import { SpecialTestimonialsComponent } from "../../shared/components/special-testimonials/special-testimonials.component";
import { HomeTopProductsComponent } from "./components/home-top-products/home-top-products.component";

@Component({
  selector: 'app-home',
  imports: [HomeHeroComponent, HomeCategoriesComponent, HomeSliderComponent, HomeSaleComponent, HomeNewCollectionComponent, SpecialProductsComponent, SpecialDiscoverComponent, SpecialServicesComponent, SpecialTestimonialsComponent, HomeTopProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
