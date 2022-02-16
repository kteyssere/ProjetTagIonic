import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailLignesPage } from './detail-lignes.page';

const routes: Routes = [
  {
    path: '',
    component: DetailLignesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailLignesPageRoutingModule {}
