import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import {ApiService} from '../services/api.service';
import {ModalController} from '@ionic/angular';
import {InfoLigneModalPage} from '../info-ligne-modal/info-ligne-modal.page';

@Component({
  selector: 'app-carte',
  templateUrl: 'carte.page.html',
  styleUrls: ['carte.page.scss']
})
export class CartePage implements OnInit, OnDestroy{

  map: Leaflet.Map;
  modalOpen: boolean;
  modalIsOpen: boolean;

  private lat: number;
  private lng: number;

  private latPin: number;
  private lngPin: number;
  private tramMarker: any;
  private tabInfo: object;
  private mode = 'tram/bus';
  private veloMarker: any;
  private voitureMarker: any;
  private markerVoitureTab: any[] = [];
  private markerTramTab: any[] = [];
  private markerVeloTab: any[] = [];

  constructor(private geolocation: Geolocation, private api: ApiService, public modalController: ModalController) {

    this.modalOpen = false;
    this.modalIsOpen = false;
  }

  ngOnInit() {

    //Prend la position gps actuelle
    this.geolocation.getCurrentPosition({
      timeout: 1000,
      enableHighAccuracy:true
    }).then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.latPin = resp.coords.latitude;
      this.lngPin = resp.coords.longitude;

      // let la = resp.coords.latitude;
      // console.log(la);
      // let long = resp.coords.longitude;
      // console.log(long);
    }).catch((error) => {
      console.log('Error getting location', error);
    });



  }
  ionViewDidEnter() {
    if(Leaflet !== undefined){
      this.leafletMap();
    }

  }

  //Créer la map
  leafletMap() {
    this.map = Leaflet.map('map').setView([this.lat, this.lng]);
    this.map.setZoom(18);

    if(Leaflet !== undefined){
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'edupala.com © Angular LeafLet',
      }).addTo(this.map);
      //Leaflet.Control.geocoder().addTo(this.map);
   }

    //Cherge le chemin tracé des lignes
    if(Leaflet !== undefined){
      this.loadTroncons();
    }

    //Image de la pin
    let pin = Leaflet.icon({
      iconUrl: 'assets/geolocation-pin.png',
      iconSize: [50, 50],
    });

    let _this = this;

    //Event sur le zoom
    this.map.on('zoomend',function(e){

      if (_this.map.getZoom() < 15){

        //console.log(_this.tramMarker);
        _this.map.removeLayer(_this.tramMarker);
      }
    });

    //Event sur le mouvement sur la carte
    this.map.on('moveend',function(e){
      if(_this.mode === 'tram/bus'){
        const coord=_this.map.getCenter();
        _this.lat = coord.lat;
        _this.lng = coord.lng;
        _this.loadProxi();
      }
    });

    if(Leaflet !== undefined){
      Leaflet.marker([this.latPin, this.lngPin], {icon: pin}).addTo(this.map);
    }


  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

  //Charge les velos et parkings sur la carte
  loadPoints(type: string){
    this.api.getPoints(type).subscribe(
      (d) => {

        //Image velo
        let bicycle = Leaflet.icon({
          iconUrl: 'assets/bicycle-pin.png',
          iconSize: [50, 80],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
          shadowSize: [68, 95],
          shadowAnchor: [22, 94]
        });

        //Image voiture
        let car = Leaflet.icon({
          iconUrl: 'assets/car-pin.png',
          iconSize: [50, 80],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
          shadowSize: [68, 95],
          shadowAnchor: [22, 94]
        });

        for(let f of d['features']){

          let long = f['geometry']['coordinates'][0];
          let lat = f['geometry']['coordinates'][1];

          if(f['properties']['type']==='citelib'){
            this.mode = 'velo';

            //Efface les marker de voiture si on veut les markers de velo
            if(this.markerVoitureTab.length !== 0){
              for(let voiture of this.markerVoitureTab){
                if(Leaflet !== undefined){
                  this.map.removeLayer(voiture);
                }
              }
              this.markerVoitureTab.pop();
            }

            //Efface les marker de tram si on veut les markers de velo
            if(this.markerTramTab.length !== 0){
              for(let tram of this.markerTramTab){
                if(Leaflet !== undefined) {
                  this.map.removeLayer(tram);
                }
              }
              this.markerTramTab.pop();
            }

          }

          if(f['properties']['type']==='PKG'){
            this.mode = 'voiture';

            //Efface les marker de velo si on veut les markers de voiture
            if(this.markerVeloTab.length !== 0){
              for(let velo of this.markerVeloTab){
                if(Leaflet !== undefined) {
                  this.map.removeLayer(velo);
                }
              }
              this.markerVeloTab.pop();
            }

            //Efface les marker de tram si on veut les markers de voiture
            if(this.markerTramTab.length !== 0){
              for(let tram of this.markerTramTab){
                if(Leaflet !== undefined) {
                  this.map.removeLayer(tram);
                }
              }
              this.markerTramTab.pop();


              //this.tramMarker = null;
            }

          }

          //Ajoute des marker de velo
          if(this.mode === 'velo'){
            if(Leaflet !== undefined){
              this.veloMarker = Leaflet.marker([lat, long], {icon: bicycle}).addTo(this.map);
            }
            this.markerVeloTab.push(this.veloMarker);
          }

          //Ajoute des marker de voiture
          if(this.mode === 'voiture'){
            if(Leaflet !== undefined) {
              this.voitureMarker = Leaflet.marker([lat, long], {icon: car}).addTo(this.map);
            }
            this.markerVoitureTab.push(this.voitureMarker);
          }
        }
      });
  }

  //Recherge la position au moment du click sur le bouton
  refreshPosition() {
    this.map.setView([this.latPin, this.lngPin], 30);
  }

  //Charge les points d'arrets les plus proches
  loadProxi(){

    this.mode = 'tram/bus';

    //Efface les marker de velo si on veut les markers de tram/bus
    if(this.markerVeloTab.length !== 0){
      //this.map.removeLayer(this.veloMarker);
      //this.veloMarker = null;
      for(let velo of this.markerVeloTab){
        if(Leaflet !== undefined) {
          this.map.removeLayer(velo);
        }
      }
      this.markerVeloTab.pop();
    }

    //Efface les marker de voiture si on veut les markers de tram/bus
    if(this.markerVoitureTab.length !== 0){
      for(let voiture of this.markerVoitureTab){
        if(Leaflet !== undefined) {
          this.map.removeLayer(voiture);
        }
      }
      this.markerVoitureTab.pop();
    }

    this.api.getPointsProxi(this.lng, this.lat).subscribe(
      (d) => {

        let bus = Leaflet.icon({
          iconUrl: 'assets/bus-pin.png',
          iconSize: [50, 80],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
          shadowSize: [68, 95],
          shadowAnchor: [22, 94]
        });

        let _this = this;

        for(let f=0 ; f < d['length'] ; f++) {

          //Ajoute des marker de tram et un onClick envent
          if(Leaflet !== undefined) {
            this.tramMarker = Leaflet.marker([d[f]['lat'], d[f]['lon']], {icon: bus}).addTo(this.map).on('click', function (e) {

              //e.originalEvent = PointerEvent;
              // e.originalEvent.originalEvent.isTrusted;

              //Ouvre le modal au moment du click
              _this.openModal(d[f]['name'], d[f]['lines']);

            });
          }
          this.markerTramTab.push(this.tramMarker);

        }
        });
}

  //Charge les tracés des lignes
  loadTroncons(){
    this.api.getTronconsLignes().subscribe(
      (data) => {

        // var c = [];
        for(let f of data['features']){

          let latlngsArr = f['geometry']['coordinates'];
          // console.log(f['geometry']);
          // console.log(latlngsArr);
          for (let k = 0; k < latlngsArr.length; k++) {
            latlngsArr[k] = latlngsArr[k].reverse();
          }
        //console.log(latlngsArr);

          //if( Leaflet !== undefined){
            let polyline = Leaflet.polyline(latlngsArr, {color: 'green'}, {weight: 2}).addTo(this.map);


          //console.log('test');
          // this.map.fitBounds(polyline.getBounds());
            //console.log('polyline');
         // }
        }
        // Leaflet.polyline(this.connectDots(data)).addTo(this.map);


        //
        //
        // for(let t=0 ; t < data['length'] ; t++){
        //   var x = data._layers[i]._latlng.lat;
        //   var y = data._layers[i]._latlng.lng;
        //   c.push([x, y]);
        //   Leaflet.marker([d[f]['lat'], d[f]['lon']], {icon: bus}).addTo(this.map);
        // }
      });
  }

  connectDots(data) {
    var c = [];
    // for (let i = 0; i < data['length']; i += 1) {
    //   c.push(data[i]['geometry']['coordinates']);
    // }
    for(let f of data['features']){
      c.push(f['geometry']['coordinates']);
    }
    return c;
  }

  //Ouvre le modal info ligne
  async openModal(name: any, lines: any) {
    const modal = await this.modalController.create({
      component: InfoLigneModalPage,
      initialBreakpoint: 0.4,
      breakpoints: [0.192, 0.4, 0.8],
      componentProps: {
        "name": name,
        "lines": lines
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
      }


    });

    return await modal.present();
  }

}
