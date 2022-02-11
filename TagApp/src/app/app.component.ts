import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Accueil', url: '/helloworld', icon: 'location' },
    { title: 'Préférences', url: '/fromhelloworld', icon: 'settings' },
    { title: 'Perturbations', url: '/image', icon: 'warning' },
    { title: 'Etat du trafic routier', url: '/buttons', icon: 'car' },
    { title: 'A propos', url: '/display-json', icon: 'information-circle' },
  ];
  constructor() {}
}
