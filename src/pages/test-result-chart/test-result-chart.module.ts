import { MomentModule } from 'angular2-moment';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestResultChartPage } from './test-result-chart';

@NgModule({
  declarations: [
    TestResultChartPage,
  ],
  imports: [
    IonicPageModule.forChild(TestResultChartPage),
    MomentModule
  ],
})
export class TestResultChartPageModule {}
