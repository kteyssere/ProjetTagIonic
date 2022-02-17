import { Component } from '@angular/core';
import {EventsService} from "../services/events.service";
import {ActivatedRoute} from "@angular/router";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-favoris',
  templateUrl: 'favoris.page.html',
  styleUrls: ['favoris.page.scss']
})
export class FavorisPage {

  tab: string[] = [];

  constructor(private evts: EventsService, private route: ActivatedRoute, private bd: Storage) {
    this.bd.create();
    this.route.params.subscribe(data => {
    });

    this.evts.subscribe('favItin', (data) => {
      this.bd.set('favInput', data).then(d => {
        this.tab.push(d);
      });

    });

  }

}
