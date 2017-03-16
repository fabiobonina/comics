import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DataCliente } from "../../providers/dataCliente";
import { ClienteModalPage } from "../cliente-modal/cliente-modal";

/*
  Generated class for the ClienteDetalhe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cliente-detalhe',
  templateUrl: 'cliente-detalhe.html'
})
export class ClienteDetalhePage {

  public recordId             : any;
  public revisionId           : any;
  public clienteNome          : any;
  public clienteNomeFantasia  : any;
  public clienteSeguimento    : any;
  public clienteAtivo         : any;
  public isEdited             : boolean = false;
  public hideForm             : boolean = false;
  public pageTitle            : string;

  constructor(public navCtrl    : NavController,
              public navParams  : NavParams,
              public DB         : DataCliente,
              public toastCtrl  : ToastController) {
                if(navParams.get("key") && navParams.get("rev")) {
                  this.recordId 			= navParams.get("key");
                  this.revisionId 		= navParams.get("rev");
                  this.isEdited 			= true;
                  this.select(this.recordId);
                  this.pageTitle 		= 'Editando Cliente';
                }
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

   sendNotification(message)  : void {
      let notification = this.toastCtrl.create( {
         message 	: message,
         duration 	: 3000
      });
      notification.present();
   }

}
