import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpendingFormPage } from './spending-form';

@NgModule({
  declarations: [
    SpendingFormPage,
  ],
  imports: [
    IonicPageModule.forChild(SpendingFormPage),
  ],
})
export class SpendingFormPageModule {}
