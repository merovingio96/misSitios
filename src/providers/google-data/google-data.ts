import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the GoogleDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoogleDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GoogleDataProvider Provider');
  }

  //Con esto saco results de la respuesta JSON del sitio según coordenadas
  getRemoteData(lat, lng) {
  	return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyBhBtHoCUpJrKl72_GBsp4RCIRFtHTtmPg');
  }
}
