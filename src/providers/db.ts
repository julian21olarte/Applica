import { TestPresentation } from './../shared/interfaces/test.interface';
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

  public async getUserpresentations(uid: string): Promise<Array<TestPresentation>> {
    let presentations: Array<TestPresentation> = [];
    try {
      let snapPresentations = await this.database
      .collection('test_presentations')
      .where('uid', '==', uid)
      .get();

      presentations = snapPresentations.docs.map((doc) => {
        let item = doc.data();
        return <TestPresentation> {
          date: item.date.toDate(),
          uid: item.uid,
          results: item.results
        };
      });
      presentations = presentations.sort((a, b) => b.date.getTime() - a.date.getTime());

    } catch(error) { console.log(error) }
    return presentations;
  }

  public async addPresentation(presentation: TestPresentation) {
    try {
      this.database
        .collection('test_presentations').add(presentation);

    } catch(error) {
      console.log(error)
    }
  }
}
