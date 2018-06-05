import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestResultInfoPage } from './test-result-info';

@NgModule({
  declarations: [
    TestResultInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(TestResultInfoPage),
  ],
})
export class TestResultInfoPageModule {}
