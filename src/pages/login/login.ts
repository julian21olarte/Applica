import {AuthProvider} from "../../providers/auth";
import { AppAvailability } from '@ionic-native/app-availability';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

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

  public authOptions: Array<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public appAvailability: AppAvailability,
    public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.authOptions = [
      {name: 'Facebook', color: 'facebook', fn: () => this.loginFacebook()},
      {name: 'Google', color: 'google', fn: () => this.loginGoogle()}
    ];

    if(this.platform.is('cordova')) {
      // checking if user have twitter installed
      this.appAvailability.check('com.twitter.android')
      .then(
        (yes: boolean) => {
          this.authOptions.push({name: 'Twitter', color: 'twitter', fn: () => this.loginTwitter()})
        },
      );
    }
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
        // alert('Por favor completa tus datos personales...');
        page = 'PersonalDataPage';
      }
      this.navCtrl.push(page);
    } else {
      alert('error en la autenticacion');
    }
  }

}
