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

  getTronconsLignes(){
    return this.http.get(this.url+'troncons/json');
  }

  // getInfoLignes(id: number){
  //   // return this.http.get(this.url+'lines/json');
  //   return this.http.get('http://data.mobilites-m.fr/api/routers/default/index/stops/'+id+'/stoptimes');
  // }



  getInfoLignes(id: number){
    let epochNow = (new Date()).getTime();

    let date = new Date();
    // let formatDate = (date)=>{
    //   let formatted_date = date.getDate()  + (date.getMonth() + 1) + date.getFullYear()
    //   return formatted_date;
    // ;
    let formatteddate = date.getDate()+(date.getMonth() + 1)+date.getFullYear();

    //console.log(formatteddate);
   // let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth()+1;
    let d = date.getDate();
    if(m<10){
      return this.http.get(this.url+'routers/default/index/clusters/'+id+'/stoptimes');
    }else{
      return this.http.get(this.url+'routers/default/index/clusters/'+id+'/stoptimes');
    }
    //return this.http.get(this.url+'ficheHoraires/json?route='+id+'&time='+epochNow);
    //return this.http.get('http://data.mobilites-m.fr/otp/routers/2/index/stops/'+id+'/stoptimes/'+date);
  }

  getPoteau(id: number) {
    return this.http.get(this.url+'routers/default/index/routes/'+id+'/clusters');
  }
}
