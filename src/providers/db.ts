import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { FirebaseFirestore } from 'angularfire2';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {

  private database: FirebaseFirestore;
  constructor(
    public http: HttpClient,
    ){
      this.database = firebase.firestore();
  }

  public async countResults(results: Array<any>) {
    const higher = results.sort((a, b) => b.match - a.match)[0];
    try {
      let snapshot = await this.database
      .collection('typologies')
      .where('name', '==', higher.name)
      .get();

      snapshot.forEach(doc => {
        let item = doc.data();
        let countResult = item.countResult || 0;
        item.countResult = countResult + 1;
        doc.ref.set(item)
      })
    } catch(error) {
      console.log(error)
    }
  }
}
