import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItinerairePage } from './itineraire.page';

const routes: Routes = [
  {
    path: '',
    component: ItinerairePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItinerairePageRoutingModule {}
