import { AuthProvider } from './../../shared/providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../shared/interfaces/user.interface';

/**
 * Generated class for the PersonalDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'PersonalDataPage'
})
@Component({
  selector: 'page-personal-data',
  templateUrl: 'personal-data.html',
})
export class PersonalDataPage {

  private currentUser: User;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    this.authProvider.getCurrentUser()
    .subscribe(user => {
      this.currentUser = user;
      if(this.currentUser.status < 2) {
        alert('Por favor completa tus datos personales');
      }
    });    
  }

  public saveData() {
    if(this.currentUser.fullname !== '' && this.currentUser.institute !== '' && this.currentUser.stratum)
    if(this.authProvider.updateUserData(this.currentUser)) {
      alert('Datos actualizados correctamente');
      this.navCtrl.push('ProfilePage');
    }
  }

}
