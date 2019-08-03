import { AuthProvider } from './../../providers/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../shared/interfaces/user.interface';

/**
 * Generated class for the TestResultSplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'TestResultSplashPage'
})
@Component({
  selector: 'page-test-result-splash',
  templateUrl: 'test-result-splash.html',
})
export class TestResultSplashPage {

  public skipMessage: string;
  public currentUser: User;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider) {
    this.skipMessage = 'Ver los resultados';
    this.authProvider.getCurrentUser()
      .subscribe(user => {
        this.currentUser = user;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestResultSplashPage');
  }

  goToResult() {
    this.navCtrl.push('TestResultPage')
  }

}
