import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://data.mobilites-m.fr/api/';
  private types = 'arret';
  private recherche: any;
  private codeLigne: string;

  constructor(private http: HttpClient) { }

  getPoints(): Observable<any>{
    return this.http.get(this.url+'bbox/json?types='+this.types);
  }

  findType(): Observable<any>{
    return this.http.get(this.url+'findType/json?types='+this.types+'&query='+this.recherche);
  }

  findHoraires(){
    return this.http.get(this.url+'routers/default/index/routes?codes='+this.codeLigne);
  }

}
