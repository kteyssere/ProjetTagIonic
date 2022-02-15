import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartePage } from './carte.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CartePageRoutingModule } from './carte-routing.module';
import {MenuComponent} from '../menu/menu.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CartePageRoutingModule
  ],
    declarations: [CartePage, MenuComponent]
})
export class CartePageModule {}
