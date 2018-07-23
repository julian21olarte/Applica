import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestPage } from './test';
import { TestProvider } from '../../providers/test';

@NgModule({
  declarations: [
    TestPage,
  ],
  imports: [
    IonicPageModule.forChild(TestPage),
  ],
  providers: [
    TestProvider
  ]
})
export class TestPageModule {}
