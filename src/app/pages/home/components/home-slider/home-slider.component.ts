import { Component, signal, WritableSignal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-slider',
  imports: [CarouselModule],
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.scss'
})
export class HomeSliderComponent {
  imgSlider: WritableSignal<string[]> = signal([
    '/images/home-slider.jpeg',
    '/images/home-slider.jpeg',
    '/images/home-slider.jpeg',
    '/images/home-slider.jpeg'
  ]);
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }
}
