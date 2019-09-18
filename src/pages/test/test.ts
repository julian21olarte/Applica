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
    this.test = this.testProvider.getShuffleTest();
    this.questions = this.test.questions;

    this.answers = [
      {description: 'Totalmente de acuerdo', code: 5},
      {description: 'De acuerdo', code: 4},
      {description: 'Ni de acuerdo, ni en desacuerdo (Neutral)', code: 3},
      {description: 'En desacuerdo', code: 2},
      {description: 'Totalmente en desacuerdo', code: 1},
    ];
    
    this.authProvider.getCurrentUser()
    .subscribe(user => {
      this.currentUser = user;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
    this.slides.lockSwipeToNext(true);
    this.slides.lockSwipeToPrev(true);
  }

  public next(index: number) {
    if(!this.slides.isEnd()) {
      this.slides.lockSwipeToNext(false);
      this.slides.slideTo(index + 1, 800);
      this.slides.lockSwipeToNext(true);
    } else {
      this.finishTest()
    }
  }

  /**
   * finshTest
   * function called when all questions are answered
   */
  public finishTest() {
    // validate test before evaluate
    if(this.validateTest()) {
      this.loading = this.loadingCtrl.create({content: 'Cargando'});
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
          this.authProvider.updateUserData(this.currentUser);
          this.dbProvider.countResults(this.currentUser.results);
          this.dbProvider.addPresentation(this.testProvider.createPresentationByUser(this.currentUser));

          return this.navCtrl.push('TestResultSplashPage');
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