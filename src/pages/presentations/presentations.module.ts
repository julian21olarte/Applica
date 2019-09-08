import { MomentModule } from 'angular2-moment';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationProvider } from '../../providers/location';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PresentationsPage } from './presentations';

@NgModule({
  declarations: [
    PresentationsPage,
  ],
  imports: [
    IonicPageModule.forChild(PresentationsPage),
    MomentModule
  ],
  providers: [
    LocationProvider,
    Geolocation
  ]
})
export class PresentationsPageModule {}
