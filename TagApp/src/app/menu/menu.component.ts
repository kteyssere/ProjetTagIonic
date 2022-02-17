import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {CartePage} from '../carte/carte.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  private tab: string[] = [];

  constructor(private carte: CartePage) { }

  ngOnInit() {}


  loadPoints(type: string){
    this.carte.loadPoints(type);
  }

  loadProxi(){
    this.carte.loadProxi();
  }


}
