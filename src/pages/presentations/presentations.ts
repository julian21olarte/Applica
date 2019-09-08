import { DbProvider } from './../../providers/db';
import { TestPresentation } from './../../shared/interfaces/test.interface';
import { AuthProvider } from './../../providers/auth';
import {LocationProvider} from "../../providers/location";
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import "rxjs-compat/add/operator/finally";
import { User } from '../../shared/interfaces/user.interface';

/**
 * Generated class for the TestResultCareersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'PresentationsPage'
})
@Component({
  selector: 'page-presentations',
  templateUrl: 'presentations.html',
})
export class PresentationsPage {

  public loading: any;
  private currentUser: User;
  public presentations: Array<TestPresentation>;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public locationProvider: LocationProvider,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public database: DbProvider) {
  }

    ionViewWillEnter() {
      this.authProvider.getCurrentUser()
      .subscribe(user => {
          this.currentUser = user;
          console.log(this.currentUser)
          if(this.currentUser) {
            this.loadPresentations(this.currentUser.uid);
          }
      });
  }
  ionViewDidEnter() {
    if(this.currentUser) {
      this.currentUser.status = 4;
      this.authProvider.updateUserData(this.currentUser);
    }
  }

  private async loadPresentations(uid: string) {
    this.presentations = await this.database.getUserpresentations(uid);
    console.log(this.presentations)
  }

  public goToResult(presentation: TestPresentation) {
    this.navCtrl.push('TestResultPage', {presentation});
  }

}
