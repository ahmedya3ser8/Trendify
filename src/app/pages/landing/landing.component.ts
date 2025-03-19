import { Component } from '@angular/core';
import { SpecialDiscoverComponent } from "../../shared/components/special-discover/special-discover.component";
import { SpecialProductsComponent } from "../../shared/components/special-products/special-products.component";
import { SpecialServicesComponent } from "../../shared/components/special-services/special-services.component";
import { SpecialTestimonialsComponent } from "../../shared/components/special-testimonials/special-testimonials.component";
import { LandingContactComponent } from "./components/landing-contact/landing-contact.component";
import { LandingHeroComponent } from "./components/landing-hero/landing-hero.component";

@Component({
  selector: 'app-landing',
  imports: [LandingHeroComponent, LandingContactComponent, SpecialServicesComponent, SpecialProductsComponent, SpecialDiscoverComponent, SpecialTestimonialsComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
