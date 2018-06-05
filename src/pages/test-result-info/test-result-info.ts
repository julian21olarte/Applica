import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../shared/providers/auth/auth';
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
  private currentUser: User;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider) {
    this.authProvider.getCurrentUser()
    .subscribe(user => {
      this.currentUser = user;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestResultInfoPage');
  }

}
