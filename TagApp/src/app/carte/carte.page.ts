import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import {ApiService} from '../services/api.service';
import {map} from 'rxjs/operators';
import {ModalController} from '@ionic/angular';
import {MenuComponent} from "../menu/menu.component";
import {FavorisPage} from "../favoris/favoris.page";
import {InfoLigneModalPage} from "../info-ligne-modal/info-ligne-modal.page";

@Component({
  selector: 'app-carte',
  templateUrl: 'carte.page.html',
  styleUrls: ['carte.page.scss']
})
export class CartePage implements OnInit, OnDestroy{

  map: Leaflet.Map;
  modalOpen: boolean;
  modalIsOpen: boolean;

  interfaceInfo: Info[] = [];
  private lat: number;
  private lng: number;
  private tab: string[] = [];

  private tabProxi: any[] = [];
  private latPin: number;
  private lngPin: number;
  private tramMarker: any;
  private tabInfo: object;
  private mode = 'tram/bus';

  constructor(private geolocation: Geolocation, private api: ApiService, public modalController: ModalController) {
    this.modalOpen = false;
    this.loadTroncons();
    this.modalIsOpen = false;
  }

  ngOnInit() {
    // this.loadPoints('pointArret');
    this.geolocation.getCurrentPosition({
      timeout: 1000,
      enableHighAccuracy:true
    }).then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.latPin = resp.coords.latitude;
      this.lngPin = resp.coords.longitude;
      console.log(this.lat);
      console.log(this.lng);
      // let la = resp.coords.latitude;
      // console.log(la);
      // let long = resp.coords.longitude;
      // console.log(long);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {
    this.map = Leaflet.map('map').setView([this.lat, this.lng]);
    this.map.setZoom(18);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);

    let pin = Leaflet.icon({
      iconUrl: 'assets/geolocation-pin.png',
      iconSize: [50, 50],
    });

    let _this = this;
    this.map.on('zoomend',function(e){
      console.log(e);
      console.log(_this.map._zoom);
      if (_this.map.getZoom() < 15){
        console.log('zoom OK');
        //console.log(_this.tramMarker);
        _this.map.removeLayer(_this.tramMarker);
      }
    });

    this.map.on('moveend',function(e){
      if(_this.mode === 'tram/bus'){
        console.log(e);
        console.log(_this.map.getCenter());
        const coord=_this.map.getCenter();
        // let lat=coord[0].split('(');
        // let long=coord[1].split(')');
        _this.lat = coord.lat;
        _this.lng = coord.lng;
        _this.loadProxi();
      }
    });

    // Leaflet.marker([45.192655, 5.718039]).addTo(this.map).bindPopup('Delhi').openPopup();

    // antPath([[28.644800, 77.216721], [34.1526, 77.5771]],
    //   { color: '#FF0000', weight: 5, opacity: 0.6 })
    //   .addTo(this.map);






    let pinMarker = Leaflet.marker([this.latPin, this.lngPin], {icon: pin}).addTo(this.map);

    // let myMarker = Leaflet.marker([45.192655, 5.718039], {icon: myIcon}).addTo(this.map);
    // let myMarker2 = Leaflet.marker([45.192655, 5.718039], {icon: myIcon}).addTo(this.map);
    // let group = new Leaflet.featureGroup([myMarker, myMarker2]);
    // this.map.fitBounds(group.getBounds());
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

  loadPoints(type: string){
    this.api.getPoints(type).subscribe(
      (d) => {
        console.log('got it');
        console.log(d);

        let bicycle = Leaflet.icon({
          iconUrl: 'assets/bicycle-pin.png',
          iconSize: [50, 80],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
          shadowSize: [68, 95],
          shadowAnchor: [22, 94]
        });
        let car = Leaflet.icon({
          iconUrl: 'assets/car-pin.png',
          iconSize: [50, 80],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
          shadowSize: [68, 95],
          shadowAnchor: [22, 94]
        });
        //console.log(d);
        // console.log(d['geometry']);
        // console.log(d['features']);
        let image = '';
        for(let f of d['features']){
          let long = f['geometry']['coordinates'][0];
          let lat = f['geometry']['coordinates'][1];
          if(f['properties']['type']==='citelib'){
            this.mode = 'velo';
            image = 'bicycle';
          }
          if(f['properties']['type']==='PKG'){
            this.mode = 'voiture';
            image = 'car';
          }
          //this.tab.push(f['geometry']['coordinates']);
          if(this.mode === 'velo'){
            Leaflet.marker([lat, long], {icon: bicycle}).addTo(this.map);
          }
          if(this.mode === 'voiture'){
            Leaflet.marker([lat, long], {icon: car}).addTo(this.map);
          }



          //f['properties']['CODE']
          //f['properties']['COMMUNE']
          //f['properties']['LIBELLE']
          //f['properties']['PMR']
          //f['properties']['ZONE']
          //f['properties']['id']
          //f['properties']['lgn']
          //f['properties']['type']
          //console.log('testestestest'+this.tab['features']['properties']['geometry']['coordinates'][1]);
          // let bus = Leaflet.icon({
          //   iconUrl: 'assets/bus.svg',
          //   iconSize: [38, 95],
          //   iconAnchor: [22, 94],
          //   popupAnchor: [-3, -76],
          //   shadowSize: [68, 95],
          //   shadowAnchor: [22, 94]
          // });
          // Leaflet.marker([this.tab[f][1], this.tab[f][0]], {icon: bus}).addTo(this.map);

        }

      }
    );

  }

  refreshPosition() {
    // this.map = Leaflet.map('map').setView([this.lat, this.lng], 5);
    this.map.setView([this.latPin, this.lngPin], 30);
    console.log('refresh to'+this.latPin+','+this.lngPin);
  }

  loadProxi(){
    this.mode = 'tram/bus';
    this.api.getPointsProxi(this.lng, this.lat).subscribe(
      (d) => {
        console.log('got it');
        console.log(d);
        let bus = Leaflet.icon({
          iconUrl: 'assets/bus-pin.png',
          iconSize: [50, 80],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
          shadowSize: [68, 95],
          shadowAnchor: [22, 94]
        });
        let tram = Leaflet.icon({
          iconUrl: 'assets/tram-pin.png',
          iconSize: [50, 80],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
          shadowSize: [68, 95],
          shadowAnchor: [22, 94]
        });
        let _this = this;

        for(let f=0 ; f < d['length'] ; f++) {

          console.log(this.tabInfo);
          this.tramMarker = Leaflet.marker([d[f]['lat'], d[f]['lon']], {icon: bus}).addTo(this.map).on('click', function(e) {

            _this.interfaceInfo.push({
              name: d[f]['name'],
              lines: d[f]['lines'],
            });

            _this.openModal(d[f]['name'], d[f]['lines']);

            //_this.modalOpen = true;
            //if (_this.modalOpen = true) {

             // _this.modalOpen = false;
            //}
           // _this.modalOpen = !_this.modalOpen;
          });

        }
        console.log(this.tramMarker);
        // console.log(d['geometry']);
        // console.log(d['features']);
        // for(let f of d['features']) {
        //   this.tabProxi.push(f['geometry']['coordinates']);
        // }
        });
}

  loadTroncons(){
    this.api.getTronconsLignes().subscribe(
      (data) => {
        console.log(data);
        antPath([this.connectDots(data)],
          { color: '#FF0000', weight: 5, opacity: 0.6 })
          .addTo(this.map);
        // var c = [];
        // for(let f of data['features']){
        //   console.log('jshfjhdf');
        //   console.log(f['geometry']['coordinates']);
        // }


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


  async openModal(name: any, lines: any) {
    const modal = await this.modalController.create({
      component: InfoLigneModalPage,
      initialBreakpoint: 0.192,
      breakpoints: [0.192, 0.30, 0.50],
      componentProps: {
        "name": name,
        "lines": lines
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.interfaceInfo.pop();
        //alert('Modal Sent Data :'+ dataReturned);
      }

      console.log('testestestestestest');
    });

    return await modal.present();
  }

}
export interface Info{
  name: string;
  lines: string;
}

