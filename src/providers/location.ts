import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class LocationProvider {

  private placesApi: string;
  private apiKey: string;
  constructor(public geolocation: Geolocation, public http: HttpClient) {
    this.apiKey = 'AIzaSyDbGkRQ4UsGMi2wgqYnNzsOR_zvaTNWOlg';
    this.placesApi = 'https://maps.googleapis.com/maps/api/place/search/json';
  }

  public getUniversitiesByCurrentLocation1() {
    return Observable.fromPromise(this.getCoords())
      .map(coords => {
        const location = `?location=${coords.lat},${coords.lon}`;
        const key = `&key=${this.apiKey}`;
        const radius = '&radius=5000';
        const keyword = '&keyword=university';
        const sensor = '&sensor=false';
        const url = this.placesApi + location + radius + sensor + keyword + key;
        console.log(url);
        return url;
      })
      .mergeMap(url => this.http.get<any>(url))
      .map(res => {
        const results: Array<any> = res.results;
        return results.filter(result => result.name.toUpperCase().substring(0, 1) === 'U');
      });
  }

  public getUniversitiesByCurrentLocation(coords) {
    const location = `?location=${coords.lat},${coords.lon}`;
    const key = `&key=${this.apiKey}`;
    const radius = '&radius=5000';
    const keyword = '&keyword=university';
    const sensor = '&sensor=false';
    const url = this.placesApi + location + radius + sensor + keyword + key;
    return this.http.get<any>(url)
    .map(res => {
      const results: Array<any> = res.results;
      return results.filter(result => result.name.toUpperCase().substring(0, 1) === 'U');
    })
  }

  public getCoords() {
    return this.geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
      maximumAge: 3600000
    }).then(resp => {
      return {
        lat: resp.coords.latitude,
        lon: resp.coords.longitude
      };
    });
  }
}