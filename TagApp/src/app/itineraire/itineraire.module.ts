import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItinerairePage } from './itineraire.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ItinerairePageRoutingModule } from './itineraire-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ItinerairePage }]),
    ItinerairePageRoutingModule,
  ],
  declarations: [ItinerairePage]
})
export class ItinerairePageModule {}
