import { TestPresentation } from './../../shared/interfaces/test.interface';
import { DbProvider } from './../../providers/db';
import {AuthProvider} from "../../providers/auth";
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../shared/interfaces/user.interface';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public currentUser: User;
  public phases: Array<any>;
  public presentations: Array<TestPresentation>;
  public personality: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public database: DbProvider) {
    this.presentations = [];
    this.phases = [
      {description: "Registrate con tu red social favorita"},
      {description: "Completa tus datos personales"},
      {description: "Presenta nuestro test aptitudinal"},
      {description: "Descubre tu carrera profesional"}
    ];


    this.authProvider.getCurrentUser()
    .subscribe(user => {
      if(user) {
        this.currentUser = user;
        if(this.currentUser && this.currentUser.results) {
          this.personality = this.currentUser.results[0];
          this.loadPresentations(this.currentUser.uid);
        }
      }
    });
  }

  ionViewDidLoad() {
    
  }

  public goPersonalData() {
    this.navCtrl.push('PersonalDataPage');
  }

  public goToResults() {
    this.navCtrl.push('TestResultPage');
  }

  public goToPresentations() {
    this.navCtrl.push('PresentationsPage');
  }

  private async loadPresentations(uid: string) {
    this.presentations = await this.database.getUserpresentations(uid);
    // alert(this.presentations.length)
  }
}
