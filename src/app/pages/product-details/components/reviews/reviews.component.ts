import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  isOpen: boolean = true;
  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }
}
