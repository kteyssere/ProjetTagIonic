import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { FavorisPage } from './favoris.page';

describe('Tab2Page', () => {
  let component: FavorisPage;
  let fixture: ComponentFixture<FavorisPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FavorisPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FavorisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
