import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialServicesComponent } from './special-services.component';

describe('SpecialServicesComponent', () => {
  let component: SpecialServicesComponent;
  let fixture: ComponentFixture<SpecialServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
