import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { DataLocalidade } from "../../providers/dataLocalida";
import { LocalidadeModalPage } from "../localidade-modal/localidade-modal";
import { LocalidadeDetalhePage } from "../localidade-detalhe/localidade-detalhe";

/*
  Generated class for the Localidades page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-localidades',
  templateUrl: 'localidades.html'
})
export class LocalidadesPage {

  public temDados     : boolean = false;
  public localidades  : any;

  constructor(public navCtrl    : NavController,
              public navParams  : NavParams,
              public alertCtrl  : AlertController,
              public DB         : DataLocalidade,
              public toastCtrl  : ToastController) {
  }

  ionViewWillEnter() {
      this.displayLocalidades();
  }

  displayLocalidades() {
    this.DB.recuperarTodos().then((data)=> {
        let existingData = Object.keys(data).length;
        if(existingData !== 0) {
          this.temDados 	= true;
          this.localidades 	= data;
        }
        else {
          console.log("não obtemos nada!");
        }
    });
  }

  displayAlert(message) : void {
    let headsUp = this.alertCtrl.create( {
        title: 'Anteção!',
        subTitle: message,
        buttons: ['Consegui!']
    });
    headsUp.present();
  }

  viewCliente(param) {
    this.navCtrl.push(LocalidadeDetalhePage, param);
  }
  addCliente() {
    this.navCtrl.push(LocalidadeModalPage);
  }

}
