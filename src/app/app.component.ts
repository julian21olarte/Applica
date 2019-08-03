import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AuthProvider} from "../providers/auth";
import { User } from '../shared/interfaces/user.interface';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';

  public currentUser: User;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authProvider: AuthProvider) {
    this.initializeApp();

    this.authProvider.getCurrentUser()
    .subscribe(user => {
      this.currentUser = user;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public openPage(page) {
    this.nav.setRoot(page);
  }

  public async logout() {
    await this.authProvider.logout();
    this.nav.setRoot('LoginPage');
  }
}
