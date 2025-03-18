import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-landing-customer',
  imports: [],
  templateUrl: './landing-customer.component.html',
  styleUrl: './landing-customer.component.scss'
})
export class LandingCustomerComponent {
  customersData = signal([
    {title: 'Berry Gunawan', count: 3.5, desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio veritatis quam vitae voluptas illum!'},
    {title: 'Berry Gunawan', count: 3.8, desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio veritatis quam vitae voluptas illum!'},
    {title: 'Berry Gunawan', count: 3.7, desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio veritatis quam vitae voluptas illum!'}
  ]);
}
