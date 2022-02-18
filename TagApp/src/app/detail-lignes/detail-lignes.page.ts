import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {ModalController, NavParams} from '@ionic/angular';
import {InfoLigneModalPage} from "../info-ligne-modal/info-ligne-modal.page";
import {InfoItineraireModalPage} from "../info-itineraire-modal/info-itineraire-modal.page";

@Component({
  selector: 'app-detail-lignes',
  templateUrl: './detail-lignes.page.html',
  styleUrls: ['./detail-lignes.page.scss'],
})
export class DetailLignesPage implements OnInit {

  item: any;
  stopName: string[] = [];
  arrival: number[] = [];
  next: Date;
  prev: Date;
  private codeStop: string[] = [];

  constructor(private api: ApiService, private modalController: ModalController, private navParams: NavParams) {
    this.item = this.navParams.data.item;
  }

  ngOnInit() {
    //this.loadDetails(this.item);
    this.loadPoteau(this.item['id']);
  }

  loadPoteau(id: number){
    this.api.getPoteau(id).subscribe((data)=>{


      //for(let item of data[0]){
      for(let i=0 ; i<data['length'] ; i++){
        this.stopName.push(data[i]);
        this.codeStop.push(data[i]['code']);
        //this.loadDetails(data[i]['code']);
      }

    });
  }

  midnightTimestampToMinutes(seconds) {
    const now = new Date();
    const then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const diff = Math.round((now.getTime() - then.getTime()) / 1000); // difference in milliseconds
    return Math.round((seconds - diff) / 60);
  }

  loadDetails(id: number){

    this.api.getInfoLignes(id).subscribe((data) => {
      // console.log(data);
      //
      // //this.midnightTimestampToMinutes();
      //
      //for(let item of data['times']){
      if(this.arrival.length !== 0){
        this.arrival.pop();
      }
      for(let i=0 ; i<data['length'] ; i++){
        // this.next = data[0]['nextTime'];
        // this.prev =
        // this.stopName.push(item['stopName']);
        //console.log(data[i]['times'][i]['realtimeArrival']);
        // _this.openModal(d[f]['name'], d[f]['lines']);
        // console.log(this.midnightTimestampToMinutes(data[i]['times'][0]['realtimeArrival']));
        let res = this.midnightTimestampToMinutes(data[i]['times'][0]['realtimeArrival']);
        this.arrival.push(res);

        //console.log(data[i]['times']);

      }
      this.openModal(this.arrival);


    });
  }

  //Ouvre le modal info itineraire
  async openModal(arrival: any) {
    const modal = await this.modalController.create({
      component: InfoItineraireModalPage,
      initialBreakpoint: 0.4,
      breakpoints: [0.192, 0.4, 0.8],
      componentProps: {
        "arrival": arrival,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
      }


    });

    return await modal.present();
  }


}
