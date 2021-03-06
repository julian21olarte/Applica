import { MomentModule } from 'angular2-moment';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationProvider } from '../../providers/location';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestResultCareersPage } from './test-result-careers';

@NgModule({
  declarations: [
    TestResultCareersPage,
  ],
  imports: [
    IonicPageModule.forChild(TestResultCareersPage),
    MomentModule
  ],
  providers: [
    LocationProvider,
    Geolocation
  ]
})
export class TestResultCareersPageModule {}
