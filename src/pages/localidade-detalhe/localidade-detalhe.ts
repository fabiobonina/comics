import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the LocalidadeDetalhe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-localidade-detalhe',
  templateUrl: 'localidade-detalhe.html'
})
export class LocalidadeDetalhePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalidadeDetalhePage');
  }

}
