import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoLigneModalPageRoutingModule } from './info-ligne-modal-routing.module';

import { InfoLigneModalPage } from './info-ligne-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoLigneModalPageRoutingModule
  ],
  declarations: [InfoLigneModalPage]
})
export class InfoLigneModalPageModule {}
