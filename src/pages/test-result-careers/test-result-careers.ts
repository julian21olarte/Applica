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
  name: 'TestResultCareers'
})
@Component({
  selector: 'page-test-result-careers',
  templateUrl: 'test-result-careers.html',
})
export class TestResultCareersPage {

  public loading: any;
  private currentUser: User;
  public results: Array<string>;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public locationProvider: LocationProvider,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController) {
  }

    ionViewWillEnter() {
      this.authProvider.getCurrentUser()
      .subscribe(user => {
          this.currentUser = user;
          if(this.currentUser) {
            if(this.navParams.data.presentation) {
              this.results = this.navParams.data.presentation.results;
            } else {
              this.results = this.currentUser.results;
            }
          }
      });
  }
  ionViewDidEnter() {
    if(this.currentUser) {
      this.currentUser.status = 4;
      this.authProvider.updateUserData(this.currentUser);
    }
  }

}
