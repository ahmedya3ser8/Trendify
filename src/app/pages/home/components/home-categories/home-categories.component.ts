import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { ICategory } from '../../../../shared/interfaces/icategory';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home-categories',
  imports: [CarouselModule],
  templateUrl: './home-categories.component.html',
  styleUrl: './home-categories.component.scss'
})
export class HomeCategoriesComponent implements OnInit, OnDestroy {
  destory$: Subject<any> = new Subject();
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
        items: 1
      },
      400: {
        items: 2
      },
      550: {
        items: 3
      },
      740: {
        items: 4
      },
      850: {
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
    this.categoriesService.getAllCategories().pipe(takeUntil(this.destory$)).subscribe({
      next: (res) => {
        this.categories.set(res.data);
      }
    })
  }
  ngOnDestroy(): void {
    this.destory$.next('Done');
  }
}
