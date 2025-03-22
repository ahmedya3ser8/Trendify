import { Component } from '@angular/core';
import { ContactMeComponent } from "../../shared/components/contact-me/contact-me.component";
import { SubscriptionComponent } from "../../shared/components/subscription/subscription.component";

@Component({
  selector: 'app-contact-us',
  imports: [ContactMeComponent, SubscriptionComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

}
