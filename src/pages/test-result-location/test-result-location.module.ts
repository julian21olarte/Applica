import { Geolocation } from '@ionic-native/geolocation';
import { LocationProvider } from './../../shared/providers/location/location';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestResultLocationPage } from './test-result-location';

@NgModule({
  declarations: [
    TestResultLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(TestResultLocationPage),
  ],
  providers: [
    LocationProvider,
    Geolocation
  ]
})
export class TestResultLocationPageModule {}
