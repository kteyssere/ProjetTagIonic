import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoItineraireModalPage } from './info-itineraire-modal.page';

const routes: Routes = [
  {
    path: '',
    component: InfoItineraireModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoItineraireModalPageRoutingModule {}
