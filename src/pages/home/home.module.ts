import { NgModule } from '@angular/core';
import { HomePage} from './home';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [HomePage],
  imports: [
    IonicPageModule.forChild(HomePage),
    HttpModule
  ],
  entryComponents: [HomePage]
})
export class HomePageModule { }
