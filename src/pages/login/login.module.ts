import { AppAvailability } from '@ionic-native/app-availability';
import { SharedModule } from './../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    HttpClientModule,
    SharedModule
  ],
  providers: [
    AppAvailability
  ]
})
export class LoginPageModule {}
