import { AuthProvider } from './../../providers/auth';
import {LocationProvider} from "../../providers/location";
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import "rxjs-compat/add/operator/finally";
import { User } from '../../shared/interfaces/user.interface';

/**
 * Generated class for the TestResultCareersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'TestResultCareers'
})
@Component({
  selector: 'page-test-result-careers',
  templateUrl: 'test-result-careers.html',
})
export class TestResultCareersPage {

  public loading: any;
  private currentUser: User;
  public personalities: Array<string>;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public locationProvider: LocationProvider,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController) {
  }

    ionViewWillEnter() {
      // this.loading = this.loadingCtrl.create({content: 'Cargando'});

      // this.loading.present();
      // this.locationProvider.getUniversitiesByCurrentLocation1()
      // .finally(() => this.loading.dismiss())
      // .subscribe(universities => this.universities = universities,
      // error => alert('Error al tratar de hallar coordenadas.'));
      this.authProvider.getCurrentUser()
      .subscribe(user => {
          this.currentUser = user;
          console.log(this.currentUser)
          this.personalities = this.currentUser.careers;
      });
  }

}
