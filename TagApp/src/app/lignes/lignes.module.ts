import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LignesPageRoutingModule } from './lignes-routing.module';

import { LignesPage } from './lignes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LignesPageRoutingModule
  ],
  declarations: [LignesPage]
})
export class LignesPageModule {}
