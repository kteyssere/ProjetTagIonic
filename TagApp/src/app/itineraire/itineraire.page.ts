import { Component } from '@angular/core';
import {Storage} from '@ionic/storage';
import {EventsService} from '../services/events.service';
import {ApiService} from '../services/api.service';
import {Router} from '@angular/router';

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
  filterTerm: string;
  lieuxarret: string[]= [];
  private frominput: string;
  private router: Router;

  constructor(private bd: Storage, private evts: EventsService, private api: ApiService, private route: Router) {
    this.frominput = '';
    this.fav = true;
    this.bd.create();
  }

  handleClick(){
    if(this.fav){

      this.evts.publish(   'favItin',    {depart: this.depart, arrivee: this.arrivee, date: this.date, partirapres: this.partirapres, mode: this.mode}   );
      this.bd.set('favInput', this.fav).then(data => {
        console.log(data);
      });

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
    // this.router.navigate(['/carte', {
    //   arg1: 1,
    //   from: 'itineraire'
    // }]);
  }

  loadListeLieuxArrets(val: any){
    this.api.findType('lieux,arret',val).subscribe((data)=>{
      for(let d of data['features']){
        this.lieuxarret.push(d['properties']['LIBELLE']);
      }
      //console.log(data['features']['properties']['LIBELLE']);
    });
  }

  updateSearchBar($event: any) {
    this.loadListeLieuxArrets($event.detail.value);
  }
}
