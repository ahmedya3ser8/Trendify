import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { ICategory } from '../../../../shared/interfaces/icategory';

@Component({
  selector: 'app-home-categories',
  imports: [CarouselModule],
  templateUrl: './home-categories.component.html',
  styleUrl: './home-categories.component.scss'
})
export class HomeCategoriesComponent implements OnInit {
  categories: WritableSignal<ICategory[]> = signal([]);
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 4
      },
      740: {
        items: 6
      },
      940: {
        items: 8
      }
    },
    nav: true
  }
  private readonly categoriesService = inject(CategoriesService);
  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categories.set(res.data);
      }
    })
  }
}
