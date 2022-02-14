import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://data.mobilites-m.fr/api/';
  private types = 'arret';
  private recherche: any;
  private codeLigne: string;

  constructor(private http: HttpClient) { }

  getPoints(type: string): Observable<any>{
    return this.http.get(this.url+'bbox/json?types='+type);
  }

  findType(type: string, recherche: string): Observable<any>{
    return this.http.get(this.url+'findType/json?types='+type+'&query='+recherche);
  }

  findHoraires(codeLigne: string){
    return this.http.get(this.url+'routers/default/index/routes?codes='+codeLigne);
  }

  getPointsProxi(longitude: number, latitude: number){
    return this.http.get(this.url+'linesNear/json?x='+longitude+'&y='+latitude+'&dist=400&details=true');
    // return this.http.get(this.url+'linesNear/json?x=5.709360123&y=45.176494599999984&dist=400&details=true ');
  }

  getListLignes(){
    return this.http.get(this.url+'routers/default/index/routes');
  }
}
