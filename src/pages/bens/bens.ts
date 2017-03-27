import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BemPaiPage } from "./bem-pai/bem-pai";
import { BemFilhoPage } from "./bem-filho/bem-filho";
import { BemFamiliaPage } from "./bem-familia/bem-familia";

/*
  Generated class for the Bens page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bens',
  templateUrl: 'bens.html'
})
export class BensPage {

  tab1Root: any = BemPaiPage;
  tab2Root: any = BemFilhoPage;
  tab3Root: any = BemFamiliaPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}


}
