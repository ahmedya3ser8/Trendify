import { Component } from '@angular/core';
import { SpecialDiscoverComponent } from "../../shared/components/special-discover/special-discover.component";
import { SpecialProductsComponent } from "../../shared/components/special-products/special-products.component";
import { SpecialServicesComponent } from "../../shared/components/special-services/special-services.component";
import { SpecialTestimonialsComponent } from "../../shared/components/special-testimonials/special-testimonials.component";
import { LandingHeroComponent } from "./components/landing-hero/landing-hero.component";
import { ContactMeComponent } from "../../shared/components/contact-me/contact-me.component";

@Component({
  selector: 'app-landing',
  imports: [LandingHeroComponent, SpecialServicesComponent, SpecialProductsComponent, SpecialDiscoverComponent, SpecialTestimonialsComponent, ContactMeComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
