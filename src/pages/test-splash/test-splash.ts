import { AuthProvider } from '../../providers/auth';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { User } from '../../shared/interfaces/user.interface';

/**
 * Generated class for the TestResultSplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'TestSplashPage'
})
@Component({
  selector: 'page-test-splash',
  templateUrl: 'test-splash.html',
})
export class TestSplashPage {

  @ViewChild(Slides) slides: Slides;
  public skipMessage: string;
  public firstTime: boolean;
  public currentUser: User;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider) {
    this.firstTime = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestResultSplashPage');
    
    this.changeSkipMessage();
    this.slides.ionSlideWillChange.subscribe(_ => {
      this.changeSkipMessage()
    })

    this.authProvider.getCurrentUser()
      .subscribe(user => {
        this.currentUser = user;
        if(!this.currentUser || !this.currentUser.results) {
          //this.slides.slideNext()
          this.firstTime = true;
        }
      })
  }

  private changeSkipMessage() {
    if(!this.slides.getActiveIndex()) {
      this.skipMessage = 'Si quiero!';
    } else {
      this.skipMessage = 'Ir al test!';
      this.slides.lockSwipes(true)
    }
  }

  public goToTest() {
    this.navCtrl.setRoot('TestPage')
  }

  public next() {
    if(!this.slides.isEnd()) {
      this.slides.slideTo(1, 500);
    } else {
      this.goToTest()
    }
  }

}
