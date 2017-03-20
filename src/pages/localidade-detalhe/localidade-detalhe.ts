import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DataLocalidade } from "../../providers/dataLocalidade";

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

  public recordId        : any;
  public revisionId      : any;
  public localCliente    : any;
  public localNome       : any;
  public localTipo       : any;
  public localMunicipio  : any;
  public localUF         : any;
  public localLat        : any;
  public localLong       : any;
  public localAtivo      : any;
  public isEdited        : boolean = false;
  public hideForm        : boolean = false;
  public pageTitle       : string;

  constructor(public navCtrl    : NavController,
              public navParams  : NavParams,
              public DB         : DataLocalidade,
              public toastCtrl  : ToastController) {
                if(navParams.get("key") && navParams.get("rev")) {
                  this.recordId 			= navParams.get("key");
                  this.revisionId 		= navParams.get("rev");
                  this.isEdited 			= true;
                  this.select(this.recordId);
                  this.pageTitle 		= 'Editando';
                }
              }

  select(id) {
      this.DB.recuperarDados(id)
      .then((doc)=> {
         this.localNome         = doc[0].nome;
         this.localCliente	    = doc[0].cliente;
         this.localTipo 	      = doc[0].tipo;
         this.localMunicipio 		= doc[0].municipio;
         this.localUF 		  	  = doc[0].uf;
         this.localLat 		  	  = doc[0].Lat;
         this.localLong 		  	= doc[0].Long;
         this.localAtivo 		  	= doc[0].ativo;
         this.recordId 				  = doc[0].id;
         this.revisionId 			  = doc[0].rev;
      });
      console.log(this.localLat);
   }

   
   
   sendNotification(message)  : void {
      let notification = this.toastCtrl.create( {
         message 	: message,
         duration 	: 3000
      });
      notification.present();
   }

}
