import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth";
import { User } from '../../shared/interfaces/user.interface';

/**
 * Generated class for the TestResultInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'TestResultInfo'
})
@Component({
  selector: 'page-test-result-info',
  templateUrl: 'test-result-info.html',
})
export class TestResultInfoPage {
  public currentUser: User;
  public results: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider) {
    this.authProvider.getCurrentUser()
    .subscribe(user => {
      this.currentUser = user;
      if(this.currentUser && this.currentUser.results) {
        if(this.navParams.data.presentation) {
          this.results = this.navParams.data.presentation.results;
        } else {
          this.results = this.currentUser.results;
        }
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestResultInfoPage');
  }

}
