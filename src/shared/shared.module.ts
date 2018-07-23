import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { NgModule } from '@angular/core';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  exports: [],
  declarations: [],
  providers: [
    Facebook,
    GooglePlus,
    TwitterConnect
  ]
})
export class SharedModule { }
