import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DataLocalidade } from "../../providers/dataLocalida";

/*
  Generated class for the LocalidadeModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-localidade-modal',
  templateUrl: 'localidade-modal.html'
})
export class LocalidadeModalPage {

  public recordId        : any;
  public revisionId      : any;
  public localCliente    : any;
  public localNome       : any;
  public localTipo       : any;
  public localMunicipio  : any;
  public localUF         : any;
  public localLatitude   : any;
  public localLongitude  : any;
  public localAtivo      : any;
  public isEdited        : boolean = false;
  public hideForm        : boolean = false;
  public pageTitle       : string;

  constructor(public navCtrl    : NavController,
              public navParams  : NavParams,
              public DB         : DataLocalidade,
              public toastCtrl  : ToastController) {
                if(navParams.get("key") && navParams.get("rev")){
                  this.recordId 			= navParams.get("key");
                  this.revisionId 		= navParams.get("rev");
                  this.isEdited 			= true;
                  this.selectLocalidade(this.recordId);
                  this.pageTitle 		= 'Edição';
                }
              }

  selectLocalidade(id){
      this.DB.recuperarDado(id)
      .then((doc)=>{
        this.localCliente   = doc[0].cliente;
        this.localNome      = doc[0].nome;
        this.localTipo      = doc[0].tipo;
        this.localMunicipio = doc[0].municipio;
        this.localUF	      = doc[0].uf;
        this.localLatitude 	= doc[0].latitude;
        this.localLongitude = doc[0].longitude;
        this.localAtivo 		= doc[0].ativo;
        this.recordId 			= doc[0].id;
        this.revisionId 		= doc[0].rev;
      });
   }

   deleteCliente(){
      let nome;

      this.DB.recuperarDado(this.recordId)
      .then((doc) =>{
         nome               = doc[0].nome;
         return this.DB.removeDados(this.recordId, this.revisionId);
      })
      .then((data) =>{
         this.hideForm 	= true;
         this.sendNotification(`${nome} Foi removido com sucesso da lista de localidades`);
      })
      .catch((err) =>{
         console.log(err);
      });
   }
   updateCliente(param){
      this.navCtrl.push(LocalidadeModalPage, param);
   }

   sendNotification(message)  : void {
      let notification = this.toastCtrl.create({
         message 	: message,
         duration 	: 3000
      });
      notification.present();
   }

}
