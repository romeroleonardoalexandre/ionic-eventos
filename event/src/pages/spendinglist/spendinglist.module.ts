import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpendinglistPage } from './spendinglist';

@NgModule({
  declarations: [
    SpendinglistPage,
  ],
  imports: [
    IonicPageModule.forChild(SpendinglistPage),
  ],
})
export class SpendinglistPageModule {}
