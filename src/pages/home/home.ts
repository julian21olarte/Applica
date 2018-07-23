import { User } from './../../shared/interfaces/user.interface';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private currentUser: User;
  constructor(public navCtrl: NavController, public authProvider: AuthProvider) {
  }

    ionViewWillEnter() {
        console.log('ionViewDidLoad HomePage');
        this.authProvider.getCurrentUser()
          .subscribe(user => {
            console.log(user);
            this.currentUser = user;
          });
    }

  public goToLogin() {
    this.navCtrl.push('LoginPage');
  }
}
