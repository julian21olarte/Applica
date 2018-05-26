import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from './providers/auth/auth';
import { NgModule } from '@angular/core';
import { TwitterConnect } from '@ionic-native/twitter-connect';

@NgModule({
  imports: [AngularFireAuthModule],
  exports: [],
  declarations: [],
  providers: [
    AuthProvider,
    Facebook,
    GooglePlus,
    TwitterConnect
  ]
})
export class SharedModule { }
