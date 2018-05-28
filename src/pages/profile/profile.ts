import { PersonalDataPage } from './../personal-data/personal-data';
import { AuthProvider } from './../../shared/providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../shared/interfaces/user.interface';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private currentUser: User;
  private state: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider) {
    
  }

  ionViewDidLoad() {
    this.authProvider.getCurrentUser()
    .subscribe(user => {
      this.currentUser = user;
    });
  }

  public goPersonalData() {
    this.navCtrl.push('PersonalDataPage');
  }
}
