import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { DataCliente } from "../../providers/dataCliente";
import { ClienteModalPage } from "../cliente-modal/cliente-modal";
import { ClienteDetalhePage } from "../cliente-detalhe/cliente-detalhe";

/*
  Generated class for the Clientes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html'
})
export class ClientesPage {

  public temDados   : boolean = false;
  public clientes   : any;

  constructor(  public navCtrl   : NavController,
                public alertCtrl  : AlertController,
                public toastCtrl  : ToastController,
                public DB         : DataCliente) {
  }

  ionViewWillEnter() {
    this.displayClientes();
  }

  displayClientes() {
    this.DB.recuperarTodos().then((data)=> {
        let existingData = Object.keys(data).length;
        if(existingData !== 0) {
          this.temDados 	= true;
          this.clientes 	= data;
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
    this.navCtrl.push(ClienteDetalhePage, param);
  }
  addCliente() {
    this.navCtrl.push(ClienteModalPage);
  }


}
