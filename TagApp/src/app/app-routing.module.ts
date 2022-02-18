import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'lignes',
    loadChildren: () => import('./lignes/lignes.module').then( m => m.LignesPageModule)
  },
  {
    path: 'info-ligne-modal',
    loadChildren: () => import('./info-ligne-modal/info-ligne-modal.module').then( m => m.InfoLigneModalPageModule)
  },
  {
    path: 'detail-lignes',
    loadChildren: () => import('./detail-lignes/detail-lignes.module').then( m => m.DetailLignesPageModule)
  },
  {
    path: 'info-itineraire-modal',
    loadChildren: () => import('./info-itineraire-modal/info-itineraire-modal.module').then( m => m.InfoItineraireModalPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
