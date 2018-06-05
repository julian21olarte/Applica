import { User } from './../../shared/interfaces/user.interface';
import { AuthProvider } from './../../shared/providers/auth/auth';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private currentUser: User;
  constructor(public navCtrl: NavController, public authProvider: AuthProvider) {
    this.authProvider.getCurrentUser()
    .subscribe(user => {
      this.currentUser = user;
    });
  }

  public goToLogin() {
    this.navCtrl.push('LoginPage');
  }
}
