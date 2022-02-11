import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CartePage } from './carte.page';

describe('Tab1Page', () => {
  let component: CartePage;
  let fixture: ComponentFixture<CartePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CartePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CartePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
