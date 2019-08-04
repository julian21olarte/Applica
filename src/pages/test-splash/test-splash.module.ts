import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestSplashPage } from './test-splash';

@NgModule({
  declarations: [
    TestSplashPage,
  ],
  imports: [
    IonicPageModule.forChild(TestSplashPage),
  ],
})
export class TestSplashPageModule {}
