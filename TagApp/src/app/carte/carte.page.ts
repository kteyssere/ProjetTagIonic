import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import {ApiService} from '../services/api.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-carte',
  templateUrl: 'carte.page.html',
  styleUrls: ['carte.page.scss']
})
export class CartePage implements OnInit, OnDestroy{

  map: Leaflet.Map;
  private lat: number;
  private lng: number;
  private tab: string[] = [];

  private tabProxi: any[] = [];

  constructor(private geolocation: Geolocation, private api: ApiService) {
  }

  ngOnInit() {
    this.loadPoints('pointArret');
    this.geolocation.getCurrentPosition({
      timeout: 1000,
      enableHighAccuracy:true
    }).then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
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
      iconUrl: 'assets/pin.svg',
      iconSize: [25, 55],
      // iconAnchor: [22, 94],
      // popupAnchor: [-3, -76],
      // shadowSize: [68, 95],
      // shadowAnchor: [22, 94]
    });

    if (this.map.getZoom() < 15){
      Leaflet.iconUrl = '';
      pin.iconUrl = '';
      console.log('?????');
      console.log(this.map._zoom);

    }
    console.log(this.map._zoom);

    // Leaflet.marker([45.192655, 5.718039]).addTo(this.map).bindPopup('Delhi').openPopup();

    // antPath([[28.644800, 77.216721], [34.1526, 77.5771]],
    //   { color: '#FF0000', weight: 5, opacity: 0.6 })
    //   .addTo(this.map);



    let bus = Leaflet.icon({
      iconUrl: 'assets/bus.svg',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });

    let car = Leaflet.icon({
      iconUrl: 'assets/car.svg',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });

    let bicycle = Leaflet.icon({
      iconUrl: 'assets/bicycle.svg',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });

    let myMarker = Leaflet.marker([this.lat, this.lng], {icon: pin}).addTo(this.map);


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
        //console.log(d);
        // console.log(d['geometry']);
        // console.log(d['features']);
        for(let f of d['features']){
          this.tab.push(f['geometry']['coordinates']);

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
        let bus = Leaflet.icon({
          iconUrl: 'assets/bus.svg',
          iconSize: [38, 95],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
          shadowSize: [68, 95],
          shadowAnchor: [22, 94]
        });
        console.log(this.tab[1][1]);

        // Leaflet.marker([this.tab[1][1], this.tab[1][0]], {icon: bus}).addTo(this.map);
        //
        // for(let t = 0 ; t < this.tab.length ; t++){
        //   Leaflet.marker([this.tab[t][1], this.tab[t][0]], {icon: bus}).addTo(this.map);
        //   break;
        //   //console.log('testestestest'+this.tab[t][1]+' '+this.tab[t][0]);
        // }

      }
    );

  }

  refreshPosition() {
    // this.map = Leaflet.map('map').setView([this.lat, this.lng], 5);
    this.map.setView([this.lat, this.lng], 30);
    console.log('refresh to'+this.lat+','+this.lng);
  }

  loadProxi(){
    this.api.getPointsProxi(this.lng, this.lat).subscribe(
      (d) => {
        console.log('got it');
        console.log(d);
        let bus = Leaflet.icon({
          iconUrl: 'assets/bus.svg',
          iconSize: [38, 95],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
          shadowSize: [68, 95],
          shadowAnchor: [22, 94]
        });
        for(let f=0 ; f < d['length'] ; f++) {
          Leaflet.marker([d[f]['lat'], d[f]['lon']], {icon: bus}).addTo(this.map);
        }
        // console.log(d['geometry']);
        // console.log(d['features']);
        // for(let f of d['features']) {
        //   this.tabProxi.push(f['geometry']['coordinates']);
        // }

        });
}
}
