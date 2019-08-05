import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Platform } from 'ionic-angular';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TwitterProvider {

  private firebaseFunctionsURL: string;
  private cordova: string = 'cordova';
  constructor(
    public http: HttpClient,
    private platform: Platform
    ){
      this.firebaseFunctionsURL = !this.platform.is(this.cordova)
        ? '/firebaseFunctions' // for web with proxy
        : 'https://us-central1-applica-4886b.cloudfunctions.net'; // for device
  }

  public getTweets(query: string, count: number): Observable<any> {
    let params = new HttpParams()
      .set('query', query)
      .set('count', count.toString());
    return this.http.get(this.firebaseFunctionsURL + '/getTweets', { params });
  }
}
