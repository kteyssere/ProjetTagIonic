import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-info-itineraire-modal',
  templateUrl: './info-itineraire-modal.page.html',
  styleUrls: ['./info-itineraire-modal.page.scss'],
})
export class InfoItineraireModalPage implements OnInit {

  arrival: any;

  constructor(private modalController: ModalController, private navParams: NavParams) {
    this.arrival = this.navParams.data.arrival;

  }

  ngOnInit() {
    //console.log(this.arrival);
  }

}
