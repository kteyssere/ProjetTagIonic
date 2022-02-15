import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {Tram} from "../interfaces/tram";
import {Navette} from "../interfaces/navette";
import {Chrono} from "../interfaces/chrono";
import {Proximo} from "../interfaces/proximo";
import {Flexo} from "../interfaces/flexo";
import {TouGo} from "../interfaces/tou-go";
import {PaysVoironnais} from "../interfaces/pays-voironnais";
import {CarsRegion} from "../interfaces/cars-region";
import {CarsRegionExpress} from "../interfaces/cars-region-express";
import {MCovoitLignes} from "../interfaces/mcovoit-lignes";
import {DocumentViewer} from "@awesome-cordova-plugins/document-viewer/ngx";
import {DocumentViewerOptions} from "@awesome-cordova-plugins/document-viewer";

@Component({
  selector: 'app-lignes',
  templateUrl: './lignes.page.html',
  styleUrls: ['./lignes.page.scss'],
})
export class LignesPage implements OnInit {

  selectedSeg: string;
  tab= [
    {name: '', type: ''}
  ];

  tram: Tram[] = [];
  navette: Navette[] = [];
  chrono: Chrono[] = [];
  proximo: Proximo[] = [];
  flexo: Flexo[] = [];
  tougo: TouGo[] = [];
  paysvoironnais: PaysVoironnais[] = [];
  carsregion: CarsRegion[] = [];
  carsregionexpress: CarsRegionExpress[] = [];
  mcovoitlignes: MCovoitLignes[] = [];


  constructor(private api: ApiService, private document: DocumentViewer) { }

  ngOnInit() {
    this.selectedSeg = 'lignes';
    this.loadList();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  loadList(){
    this.api.getListLignes().subscribe(
      (data => {
        for(let d = 0 ; d < data['length'] ; d++){
          console.log(data[d]['type']);
          this.tab.push(data[d]);
          this.tab['name'] = data[d]['shortName'];
          if(data[d]['type'] === 'TRAM'){
            this.tram.push({
              id: data[d]['id'],
              name: data[d]['shortName'],
              type: data[d]['type'],
              color: data[d]['color'],
            });
          }
          if(data[d]['type'] === 'FLEXO'){
            this.flexo.push({
              id: data[d]['id'],
              name: data[d]['shortName'],
              type: data[d]['type'],
              color: data[d]['color'],
            });
          }
          if(data[d]['type'] === 'PROXIMO'){
            this.proximo.push({
              id: data[d]['id'],
              name: data[d]['shortName'],
              type: data[d]['type'],
              color: data[d]['color'],
            });
          }
          if(data[d]['type'] === 'CHRONO'){
            this.chrono.push({
              id: data[d]['id'],
              name: data[d]['shortName'],
              type: data[d]['type'],
              color: data[d]['color'],
            });
          }
          if(data[d]['type'] === 'NAVETTE'){
            this.navette.push({
              id: data[d]['id'],
              name: data[d]['shortName'],
              type: data[d]['type'],
              color: data[d]['color'],
            });
          }
          if(data[d]['type'] === 'Structurantes' || data[d]['type'] === 'Secondaires'){
            this.tougo.push({
              id: data[d]['id'],
              name: data[d]['shortName'],
              type: data[d]['type'],
              color: data[d]['color'],
            });
          }
          if(data[d]['type'] === 'C38_AUTRE'){
            this.carsregion.push({
              id: data[d]['id'],
              name: data[d]['shortName'],
              type: data[d]['type'],
              color: data[d]['color'],
            });
          }
          if(data[d]['type'] === 'C38_STRUCT'){
            this.carsregionexpress.push({
              id: data[d]['id'],
              name: data[d]['shortName'],
              type: data[d]['type'],
              color: data[d]['color'],
            });
          }
          if(data[d]['type'] === 'Interurbaines' || data[d]['type'] === 'Urbaines'){
            this.paysvoironnais.push({
              id: data[d]['id'],
              name: data[d]['shortName'],
              type: data[d]['type'],
              color: data[d]['color'],
            });
          }
          if(data[d]['type'] === 'MCO'){
            this.mcovoitlignes.push({
              id: data[d]['id'],
              name: data[d]['shortName'],
              type: data[d]['type'],
              color: data[d]['color'],
            });
          }
        }
        console.log(this.tab);
        console.log(this.tram);
      }));
  }

  openPdf(src: string) {
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    };
    this.document.viewDocument(src, 'application/pdf', options);
  }
}
