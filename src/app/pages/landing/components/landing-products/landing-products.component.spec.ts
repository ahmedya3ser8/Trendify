import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingProductsComponent } from './landing-products.component';

describe('LandingProductsComponent', () => {
  let component: LandingProductsComponent;
  let fixture: ComponentFixture<LandingProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
