import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TestResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'TestResultPage'
})
@Component({
  selector: 'page-test-result',
  templateUrl: 'test-result.html',
})
export class TestResultPage {

  public tab1: any;
  public tab2: any;
  public tab3: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1 = 'TestResultInfo';
    this.tab2 = 'TestResultChart';
    this.tab3 = 'TestResultCareers';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestResultPage');
  }

}
