import { LocationProvider } from './../../shared/providers/location/location';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the TestResultLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'TestResultLocation'
})
@Component({
  selector: 'page-test-result-location',
  templateUrl: 'test-result-location.html',
})
export class TestResultLocationPage {

  public universities: any;
  private loading: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public locationProvider: LocationProvider,
    public loadingCtrl: LoadingController) {
      this.loading = this.loadingCtrl.create({content: 'Cargando'});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestResultLocationPage');
    this.loading.present();
    this.locationProvider.getUniversitiesByCurrentLocation1()
    .subscribe(universities => {
      if(universities) {
        this.loading.dismiss();
        this.universities = universities;
        console.log(this.universities);
      }
    });
  }

}
