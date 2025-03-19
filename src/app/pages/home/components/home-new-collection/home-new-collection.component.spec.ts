import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNewCollectionComponent } from './home-new-collection.component';

describe('HomeNewCollectionComponent', () => {
  let component: HomeNewCollectionComponent;
  let fixture: ComponentFixture<HomeNewCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeNewCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeNewCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
