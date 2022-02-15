import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { HttpClientModule } from '@angular/common/http';
import {DocumentViewer} from '@awesome-cordova-plugins/document-viewer/ngx';

import {Storage} from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [Storage, Geolocation, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DocumentViewer],
  bootstrap: [AppComponent],
})
export class AppModule {}
