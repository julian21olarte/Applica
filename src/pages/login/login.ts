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

  async ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.authOptions = [
      {name: 'Facebook', color: 'facebook', fn: () => this.loginFacebook()},
      {name: 'Google', color: 'google', fn: () => this.loginGoogle()}
    ];

    if(this.platform.is('cordova')) {
      // checking if user have twitter installed
      let haveTwitter: boolean = await this.appAvailability.check('com.twitter.android')
      if(haveTwitter) {
        this.authOptions.push({name: 'Twitter', color: 'twitter', fn: () => this.loginTwitter()})
      }
    }
  }

  public async loginFacebook() {
    try {
      const user = await this.authProvider.loginFacebook();
      this.loginHandler(user);
    } catch(error) {
      console.log(error);
      alert('Error login');
    }
  }

  public async loginTwitter() {
    try {
      const user = await this.authProvider.loginTwitter();
      this.loginHandler(user);
    } catch(error) {
      console.log(error);
      alert('Error login');
    }
  }

  public async loginGoogle() {
    try {
      const user = await this.authProvider.loginGoogle();
      this.loginHandler(user);
    } catch(error) {
      console.log(error);
      alert('Error login');
    }
  }

  private loginHandler(user) {
    if(user) {
      console.log(user);
      let page = (user.status <= 1) // status <= 1 means user not already compete the profile data
        ? 'PersonalDataPage'
        : 'HomePage';
      this.navCtrl.setRoot(page);
    } else {
      alert('error en la autenticacion');
    }
  }

}
