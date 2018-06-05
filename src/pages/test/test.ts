import { AuthProvider } from './../../shared/providers/auth/auth';
import { TestProvider } from './../../shared/providers/test/test';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, LoadingController } from 'ionic-angular';
import { Question } from '../../shared/interfaces/question.interface';
import { User } from '../../shared/interfaces/user.interface';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  @ViewChild(Slides) slides: Slides;
  private questions: Array<Question>;
  private loading: any;
  private currentUser: User;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public testProvider: TestProvider,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider) {

    this.questions = this.testProvider.getTest();
    
    this.loading = this.loadingCtrl.create({content: 'Cargando'});
    this.authProvider.getCurrentUser()
    .subscribe(user => {
      this.currentUser = user;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

  public next(index: number) {
    if(!this.slides.isEnd()) {
      this.slides.slideTo(index + 1, 500);
    }
  }

  public finishTest() {
    console.log(this.questions);
    if(this.validateTest()) {
      this.testProvider.evaluateTest(this.questions)
      .subscribe(data => {
        this.loading.present();
        if(data && this.currentUser) {
          this.loading.dismiss();
          console.log(data);
          this.currentUser.status = this.currentUser.status >= 3 ? this.currentUser.status : 3;
          this.currentUser.careers = data;
          this.authProvider.updateUserData(this.currentUser);
          this.navCtrl.push('TestResultPage');
        } else {
          alert('Error guardando los datos del test');
        }
      });
    } else {
      alert('Por favor contesta todas las preguntas!');
    }
  }

  private validateTest() {
    return this.questions.every(question => question.answer ? true : false);
  }

}
