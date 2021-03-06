import { PipesModule } from './../pipes/pipes.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//firebase
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './firebase';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { DbProvider } from './../providers/db';
import {AuthProvider} from "../providers/auth";
import {LocationProvider} from "../providers/location";
import { TwitterProvider } from '../providers/twitter';
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {tabsPlacement:'top'}),
    AngularFireModule.initializeApp(firebaseConfig),
    SharedModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    DbProvider,
    LocationProvider,
    TwitterProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
