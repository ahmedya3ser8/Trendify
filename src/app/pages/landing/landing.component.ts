import { Component } from '@angular/core';
import { LandingContactComponent } from "./components/landing-contact/landing-contact.component";
import { LandingCustomerComponent } from "./components/landing-customer/landing-customer.component";
import { LandingDiscoverComponent } from "./components/landing-discover/landing-discover.component";
import { LandingHeroComponent } from "./components/landing-hero/landing-hero.component";
import { LandingProductsComponent } from "./components/landing-products/landing-products.component";
import { LandingServicesComponent } from "./components/landing-services/landing-services.component";

@Component({
  selector: 'app-landing',
  imports: [LandingHeroComponent, LandingServicesComponent, LandingProductsComponent, LandingDiscoverComponent, LandingCustomerComponent, LandingContactComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
