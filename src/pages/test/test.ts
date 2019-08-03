import { DbProvider } from './../../providers/db';
import { AuthProvider } from '../../providers/auth';
import { TestProvider } from '../../providers/test';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, LoadingController } from 'ionic-angular';
import { Question } from '../../shared/interfaces/question.interface';
import { User } from '../../shared/interfaces/user.interface';
import { Test } from '../../shared/interfaces/test.interface';

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
  private test: Test;
  private questions: Array<Question>;
  private loading: any;
  private currentUser: User;
  public answers: Array<any>;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public testProvider: TestProvider,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    public dbProvider: DbProvider) {

    // fill test, answers and questions
    this.test = this.testProvider.getTest();
    this.questions = this.test.questions;

    this.answers = [
      {description: 'Totalmente deacuerdo', code: 5},
      {description: 'Deacuerdo', code: 4},
      {description: 'Ni de acuerdo, ni en desacuerdo (Neutral)', code: 3},
      {description: 'En desacuerdo', code: 2},
      {description: 'Totalmente en desacuerdo', code: 1},
    ];
    
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

    // validate test before evaluate
    if(this.validateTest()) {

      // evaluate test
      this.testProvider.evaluateTest(this.questions)
      .subscribe(data => {
        this.loading.present();
        if(data && this.currentUser) {
          this.loading.dismiss();

          this.currentUser.status = this.currentUser.status >= 3
            ? this.currentUser.status 
            : 3; 
          this.currentUser.results = data;
          if(this.currentUser.results.length) {
            this.authProvider.updateUserData(this.currentUser);
            this.dbProvider.countResults(this.currentUser.results);
          }

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
    return this.questions
    .every(question => question.answer ? true : false);
  }

}
