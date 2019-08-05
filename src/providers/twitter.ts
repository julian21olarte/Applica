import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TwitterProvider {

  private firebaseFunctionsURL: string;
  constructor(
    public http: HttpClient,
    ){
      this.firebaseFunctionsURL = '/firebaseFunctions';
  }

  public getTweets(query: string, count: number): Observable<any> {
    let params = new HttpParams()
      .set('query', query)
      .set('count', count.toString());
    return this.http.get(this.firebaseFunctionsURL + '/getTweets', { params });
  }
}
