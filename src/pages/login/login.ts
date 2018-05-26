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
    const user = this.authProvider.loginFacebook();
    this.loginHandler(user);
  }

  public loginTwitter() {
    const user = this.authProvider.loginTwitter();
    this.loginHandler(user);
  }

  public loginGoogle() {
    const user = this.authProvider.loginGoogle();
    this.loginHandler(user);
  }

  private loginHandler(user) {
    if(user) {
      this.navCtrl.push('HomePage');
    } else {
      alert('error en la autenticacion');
    }
  }

}
