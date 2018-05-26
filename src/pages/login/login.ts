import { AuthProvider } from './../../shared/providers/auth/auth';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public loginFacebook() {
    console.log('entra');
    this.authProvider.loginFacebook()
    .then(user => {
      console.log('entra 2');
      this.loginHandler(user);
    });
  }
  public loginTwitter() {
    this.authProvider.loginTwitter()
    .then(user => {
      this.loginHandler(user);
    });
  }
  public loginGoogle() {
    this.authProvider.loginGoogle()
    .then(user => {
      this.loginHandler(user);
    });
  }

  private loginHandler(user) {
    if (user) {
      this.navCtrl.push('HomePage');
      alert('funciono!');
    } else {
      alert('error en la autenticacion');
    }
  }

}
