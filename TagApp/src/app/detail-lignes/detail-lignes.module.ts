import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailLignesPageRoutingModule } from './detail-lignes-routing.module';

import { DetailLignesPage } from './detail-lignes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailLignesPageRoutingModule
  ],
  declarations: [DetailLignesPage]
})
export class DetailLignesPageModule {}
