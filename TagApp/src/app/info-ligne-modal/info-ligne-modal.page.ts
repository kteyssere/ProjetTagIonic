import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-info-ligne-modal',
  templateUrl: './info-ligne-modal.page.html',
  styleUrls: ['./info-ligne-modal.page.scss'],
})
export class InfoLigneModalPage implements OnInit {

  name: any;
  lines: any;

  constructor(private modalController: ModalController, private navParams: NavParams) {
    console.table(this.navParams);
    this.name = this.navParams.data.name;
    this.lines = this.navParams.data.lines;
  }

  ngOnInit() {
  }

  // async closeModal() {
  //   const onClosedData = 'Wrapped Up!';
  //   await this.modalController.dismiss(onClosedData);
  // }

}
