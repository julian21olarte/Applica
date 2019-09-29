import {AuthProvider} from "../../providers/auth";
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
      .take(1)
      .subscribe(user => {
        this.currentUser = user;
        if (this.currentUser && this.currentUser.status < 2) {
          alert('Por favor completa tus datos personales');
        }
      });
  }

  public saveData() {
    if(this.currentUser.phone.length < 7) {
      alert('El telefono debe tener al menos 7 digitos')
      return false;
    }

    if (this.currentUser.fullname !== '' && this.currentUser.institute !== '' && this.currentUser.stratum && this.currentUser.age) {
      this.currentUser.status = this.currentUser.status >= 2 ? this.currentUser.status : 2;
      if (this.authProvider.updateUserData(this.currentUser)) {
        alert('Datos actualizados correctamente');
        this.navCtrl.setRoot('ProfilePage');
      }
    } else {
      alert('Por favor completa todos los datos')
    }
  }

}
