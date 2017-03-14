import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Image } from "../../providers/image";
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

  public characterImage       : any;
  public recordId             : any;
  public revisionId           : any;
  public clienteNome          : any;
  public clienteNomeFantasia  : any;
  public clienteSeguimento    : any;
  public clienteAtivo         : any;
  public clienteImage         : any;
  public isEdited             : boolean = false;
  public hideForm             : boolean = false;
  public pageTitle            : string;

  constructor(public navCtrl    : NavController,
              public navParams  : NavParams,
              public IMAGE      : Image,
              public DB         : DataCliente,
              public toastCtrl  : ToastController) {

                if(navParams.get("key") && navParams.get("rev"))
                {
                  this.recordId 			= navParams.get("key");
                  this.revisionId 		= navParams.get("rev");
                  this.isEdited 			= true;
                  this.selectCliente(this.recordId);
                  this.pageTitle 		= 'Editando Cliente';
                }
              }

  
  selectCliente(id){
      this.DB.retrieveCliente(id)
      .then((doc)=>{
         this.clienteNome         = doc[0].nome;
         this.clienteNomeFantasia	= doc[0].nomeFantasia;
         this.clienteSeguimento 	= doc[0].seguimento;
         this.clienteImage 			  = doc[0].image;
         this.characterImage 	    = doc[0].image;
         this.clienteAtivo 		  	= doc[0].ativo;
         this.recordId 				    = doc[0].id;
         this.revisionId 			    = doc[0].rev;
      });
   }

   takePhotograph(){
      this.IMAGE.takePhotograph()
      .then((image)=>{
         this.characterImage 	= image.toString();
         this.clienteImage 		= image.toString();
      })
      .catch((err)=>{
         console.log(err);
      });
   }

   selectImage(){
      this.IMAGE.selectPhotograph()
      .then((image)=>{
         this.characterImage 	= image.toString();
         this.clienteImage 		= image.toString();
      })
      .catch((err)=>{
         console.log(err);
      });
   }

   deleteCliente(){
      let nomeFantasia;

      this.DB.retrieveCliente(this.recordId)
      .then((doc) =>{
         nomeFantasia            = doc[0].nomeFantasia;
         return this.DB.removeCliente(this.recordId, this.revisionId);
      })
      .then((data) =>{
         this.hideForm 	= true;
         this.sendNotification(`${nomeFantasia} Foi removido com sucesso da lista de clientes`);
      })
      .catch((err) =>{
         console.log(err);
      });
   }
   updateCliente(param){
      this.navCtrl.push(ClienteModalPage, param);
   }

   sendNotification(message)  : void {
      let notification = this.toastCtrl.create({
         message 	: message,
         duration 	: 3000
      });
      notification.present();
   }

}
