import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialTestimonialsComponent } from './special-testimonials.component';

describe('SpecialTestimonialsComponent', () => {
  let component: SpecialTestimonialsComponent;
  let fixture: ComponentFixture<SpecialTestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialTestimonialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
