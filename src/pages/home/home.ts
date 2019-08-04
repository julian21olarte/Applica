import { User } from './../../shared/interfaces/user.interface';
import {Component, ViewChild} from '@angular/core';
import {NavController, IonicPage, Slides} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;
  public currentUser: User;
  public skipMessage: string;
  constructor(public navCtrl: NavController, public authProvider: AuthProvider) {
      this.skipMessage = 'saltar';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.authProvider.getCurrentUser()
      .subscribe(user => {
        console.log(user);
        this.currentUser = user;
        // if(this.currentUser) {
        //   if(this.currentUser.results && this.currentUser.results.length) {
        //     alert('Ya has presentado nuestra prueba, vamos a los resultados!');
        //     this.navCtrl.push('TestResultPage');
        //   }
        // }
      });
  }

  slideChanged() {
    if(this.slides.isEnd()) {
        this.skipMessage = 'Vamos!';
    }
  }
  public goToLogin() {
    this.navCtrl.push('LoginPage');
  }

  public goToProfile() {
    this.navCtrl.push('ProfilePage');
  }
}
