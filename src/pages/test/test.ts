import { TestProvider } from './../../shared/providers/test/test';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Question } from '../../shared/interfaces/question.interface';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public testProvider: TestProvider) {
    this.questions = this.testProvider.getTest();
    console.log(this.questions);
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
  }

}
