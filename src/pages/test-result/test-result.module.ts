import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestResultPage } from './test-result';

@NgModule({
  declarations: [
    TestResultPage,
  ],
  imports: [
    IonicPageModule.forChild(TestResultPage),
  ],
})
export class TestResultPageModule {}
