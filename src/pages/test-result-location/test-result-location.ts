import {LocationProvider} from "../../providers/location";
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import "rxjs-compat/add/operator/finally";

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
  }

    ionViewWillEnter() {
      this.loading = this.loadingCtrl.create({content: 'Cargando'});

      this.loading.present();
      this.locationProvider.getUniversitiesByCurrentLocation1()
      .finally(() => this.loading.dismiss())
      .subscribe(universities => this.universities = universities,
      error => alert('Error al tratar de hallar coordenadas.'));
  }

}
