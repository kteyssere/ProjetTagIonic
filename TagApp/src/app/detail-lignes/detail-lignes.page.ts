import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {ModalController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-detail-lignes',
  templateUrl: './detail-lignes.page.html',
  styleUrls: ['./detail-lignes.page.scss'],
})
export class DetailLignesPage implements OnInit {

  item: any;
  stopName: string[] = [];
  next: Date;
  prev: Date;

  constructor(private api: ApiService, private modalController: ModalController, private navParams: NavParams) {
    console.table(this.navParams);
    this.item = this.navParams.data.item;
  }

  ngOnInit() {
    this.loadDetails(this.item);
  }

  loadDetails(id: number){
    this.api.getInfoLignes(id).subscribe((data) => {
      console.log(data);

      for(let item of data[0]['arrets']){
        this.next = new Date(data[0]['nextTime']);
        this.prev = new Date(data[0]['prevTime']);
        this.stopName.push(item['stopName']);
      }
      console.log(this.stopName);

    });
  }
}
