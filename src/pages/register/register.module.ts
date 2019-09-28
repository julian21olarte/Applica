import { AppAvailability } from '@ionic-native/app-availability';
import { SharedModule } from './../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    HttpClientModule,
    SharedModule
  ],
  providers: [
    AppAvailability
  ]
})
export class RegisterPageModule {}
