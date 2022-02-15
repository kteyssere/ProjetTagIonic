import { Component } from '@angular/core';
import {Storage} from '@ionic/storage';
import {EventsService} from "../services/events.service";

@Component({
  selector: 'app-itineraire',
  templateUrl: 'itineraire.page.html',
  styleUrls: ['itineraire.page.scss']
})

export class ItinerairePage {
  depart: string;
  arrivee: string;
  date: any;
  partirapres: string;
  fav: boolean;
  mode: any;
  private frominput: string;




  constructor(private bd: Storage, private evts: EventsService) {
    this.frominput = '';
    this.fav = true;
    this.bd.create();
  }

  handleClick(){
    if(this.fav){
      console.log('publication');
      this.evts.publish(   'favItin',    {depart: this.depart, arrivee: this.arrivee, date: this.date, partirapres: this.partirapres, mode: this.mode}   );
      this.bd.set('favInput', this.fav).then(data => {
        console.log(data);

      });
      // this.bd.get('favInput').then( data => {
      //
      //   console.log(data);
      // });
    }else{
      // this.fav = true;
      this.bd.set('favInput', this.fav).then(data => {
        console.log(data);

      });
      // this.bd.get('favInput').then( data => {
      //   console.log(data);
      // });

    }
    this.fav = !this.fav;
  }

  Go() {

  }
}
