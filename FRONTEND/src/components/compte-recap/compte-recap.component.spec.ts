import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteRecapComponent } from './compte-recap.component';

describe('CompteRecapComponent', () => {
  let component: CompteRecapComponent;
  let fixture: ComponentFixture<CompteRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompteRecapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompteRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
