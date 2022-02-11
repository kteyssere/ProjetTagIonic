import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'carte',
        loadChildren: () => import('../carte/carte.module').then(m => m.CartePageModule)
      },
      {
        path: 'favoris',
        loadChildren: () => import('../favoris/favoris.module').then(m => m.FavorisPageModule)
      },
      {
        path: 'itineraire',
        loadChildren: () => import('../itineraire/itineraire.module').then(m => m.ItinerairePageModule)
      },
      {
        path: 'lignes',
        loadChildren: () => import('../lignes/lignes.module').then(m => m.LignesPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/carte',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/carte',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
