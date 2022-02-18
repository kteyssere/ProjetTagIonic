import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoItineraireModalPageRoutingModule } from './info-itineraire-modal-routing.module';

import { InfoItineraireModalPage } from './info-itineraire-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoItineraireModalPageRoutingModule
  ],
  declarations: [InfoItineraireModalPage]
})
export class InfoItineraireModalPageModule {}
