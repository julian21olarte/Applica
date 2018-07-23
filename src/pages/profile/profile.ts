import {AuthProvider} from "../../providers/auth";
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
  private phases: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider) {
    this.phases = [
      {description: "Registrate con tu red social favorita"},
      {description: "Completa tus datos personales"},
      {description: "Presenta nuestro test aptitudinal"},
      {description: "Descubre tu carrera profesional"}
    ]
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
