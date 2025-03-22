import { DatePipe } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { SubscriptionComponent } from "../../shared/components/subscription/subscription.component";

@Component({
  selector: 'app-blog',
  imports: [DatePipe, SubscriptionComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  blogImgs: WritableSignal<string[]> = signal([
    '/images/blog-1.png',
    '/images/blog-2.png',
    '/images/blog-3.png',
    '/images/blog-4.png',
    '/images/blog-5.png',
    '/images/blog-6.png'
  ]);
  date: Date = new Date();
}
