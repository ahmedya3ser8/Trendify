import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialDiscoverComponent } from './special-discover.component';

describe('SpecialDiscoverComponent', () => {
  let component: SpecialDiscoverComponent;
  let fixture: ComponentFixture<SpecialDiscoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialDiscoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialDiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
