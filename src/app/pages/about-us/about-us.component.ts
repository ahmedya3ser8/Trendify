import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  aboutImgs: WritableSignal<string[]> = signal([
    '/images/about-footer-1.jpg',
    '/images/about-footer-2.webp',
    '/images/about-footer-3.webp',
    '/images/about-footer-4.webp',
    '/images/about-footer-5.jpg'
  ]);
}
