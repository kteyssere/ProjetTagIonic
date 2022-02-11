import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-carte',
  templateUrl: 'carte.page.html',
  styleUrls: ['carte.page.scss']
})
export class CartePage implements OnInit, OnDestroy{

  map: Leaflet.Map;
  private lat: number;
  private lng: number;

  constructor(private geolocation: Geolocation, private api: ApiService) {
  }

  ngOnInit() {
    this.loadPoints();
    this.geolocation.getCurrentPosition({
      timeout: 10000,
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
    this.map = Leaflet.map('map').setView([this.lat, this.lng], 5);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);

    // Leaflet.marker([45.192655, 5.718039]).addTo(this.map).bindPopup('Delhi').openPopup();

    // antPath([[28.644800, 77.216721], [34.1526, 77.5771]],
    //   { color: '#FF0000', weight: 5, opacity: 0.6 })
    //   .addTo(this.map);
    let myIcon = Leaflet.icon({
      iconUrl: 'assets/bus-outline.svg',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      // shadowUrl: 'my-icon-shadow.png',
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });
    let myMarker = Leaflet.marker([45.192655, 5.718039], {icon: myIcon}).addTo(this.map);
    let myMarker2 = Leaflet.marker([45.192655, 5.718039], {icon: myIcon}).addTo(this.map);
    let group = new Leaflet.featureGroup([myMarker, myMarker2]);
    this.map.fitBounds(group.getBounds());
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

  loadPoints(){
    this.api.getPoints().subscribe(
      (d) => {
        console.log('got it');
        console.log(d);
      }
    );
  }

}
