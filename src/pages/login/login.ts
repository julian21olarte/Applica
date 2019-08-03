import {AuthProvider} from "../../providers/auth";

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

  public async loginFacebook() {
    const user = await this.authProvider.loginFacebook();
    this.loginHandler(user);
  }

  public async loginTwitter() {
    const user = await this.authProvider.loginTwitter();
    this.loginHandler(user);
  }

  public async loginGoogle() {
    const user = await this.authProvider.loginGoogle();
    this.loginHandler(user);
  }

  private loginHandler(user) {
    if(user) {
      console.log(user);
      let page = 'HomePage';
      if(user.status <= 1) {
        alert('Por favor completa tus datos personales...');
        page = 'PersonalDataPage';
      }
      this.navCtrl.setRoot(page);
    } else {
      alert('error en la autenticacion');
    }
  }

}
