import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { DataCliente } from "../../providers/dataCliente";
import { ClienteDetalhePage } from "./cliente-detalhe/cliente-detalhe";
import { ClienteModalPage } from "./cliente-modal/cliente-modal";


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
  public recordId             : any;
  public revisionId           : any;
  public clienteNome          : any;
  public clienteNomeFantasia  : any;
  public clienteSeguimento    : any;
  public clienteAtivo         : any;
  public isEdited             : boolean = false;
  public hideForm             : boolean = false;
  public pageTitle            : string;

  constructor(  public navCtrl   : NavController,
                public navParams  : NavParams,
                public alertCtrl  : AlertController,
                public toastCtrl  : ToastController,
                public DB         : DataCliente) {
                if(navParams.get("key") && navParams.get("rev")) {
                  this.recordId 			= navParams.get("key");
                  this.revisionId 		= navParams.get("rev");
                  this.isEdited 			= true;
                  this.select(this.recordId);
                  this.pageTitle 		= 'Editando Cliente';
                }
  }

  ionViewWillEnter() {
    this.getTodos();
  }

  getTodos() {
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

    select(id) {
      this.DB.recuperarDados(id)
      .then((doc)=> {
         this.clienteNome         = doc[0].nome;
         this.clienteNomeFantasia	= doc[0].nomeFantasia;
         this.clienteSeguimento 	= doc[0].seguimento;
         this.clienteAtivo 		  	= doc[0].ativo;
         this.recordId 				    = doc[0].id;
         this.revisionId 			    = doc[0].rev;
      });
   }

  viewDados(param) {
    this.navCtrl.push(ClienteDetalhePage, param);
  }
  insert() {
    this.navCtrl.push(ClienteModalPage);
  }

  delete(id) {
      let nomeFantasia;
      let revId;
      this.DB.recuperarDados(id)
      .then((doc) => {
         nomeFantasia         = doc[0].nomeFantasia;
         revId 			    = doc[0].rev;
         return this.DB.removeDados(id, revId);
      })
      .then((data) => {
         this.hideForm 	= true;
         this.sendNotification(`${nomeFantasia} Foi removido com sucesso da lista de clientes`);
         this.getTodos();
      })
      .catch((err) => {
         console.log(err);
      });
   }

   update(param){
      this.navCtrl.push(ClienteModalPage, param);
   }

    sendNotification(message)  : void {
      let notification = this.toastCtrl.create( {
         message 	: message,
         duration 	: 3000
      });
      notification.present();
   }


}
