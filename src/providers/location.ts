import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import {throwError} from "rxjs";
import "rxjs-compat/add/observable/of";
import "rxjs-compat/add/observable/empty";
import {catchError, map, switchMap} from "rxjs/operators";
import {fromPromise} from "rxjs-compat/observable/fromPromise";

@Injectable()
export class LocationProvider {

  private placesApi: string;
  private apiKey: string;
  constructor(public geolocation: Geolocation, public http: HttpClient) {
    this.apiKey = 'AIzaSyDbGkRQ4UsGMi2wgqYnNzsOR_zvaTNWOlg';
    this.placesApi = 'https://maps.googleapis.com/maps/api/place/search/json';
  }

  public getUniversitiesByCurrentLocation1() {
    return fromPromise(this.getCoords())
      .pipe(
          map((coords: any) => {
              const location = `?location=${coords.lat},${coords.lon}`;
              const key = `&key=${this.apiKey}`;
              const radius = '&radius=5000';
              const keyword = '&keyword=university';
              const sensor = '&sensor=false';
              const url = this.placesApi + location + radius + sensor + keyword + key;
              console.log(url);
              return url;
          }),
          switchMap((url: string) => this.http.get<any>(url)),
          map((res: any) => {
              const results: Array<any> = res.results;
              return results.filter(result => result.name.toUpperCase().substring(0, 1) === 'U');
          }),
          catchError((error: any) => {
              return throwError(error);
          })
      );
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