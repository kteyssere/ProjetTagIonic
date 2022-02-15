import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoLigneModalPage } from './info-ligne-modal.page';

const routes: Routes = [
  {
    path: '',
    component: InfoLigneModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoLigneModalPageRoutingModule {}
