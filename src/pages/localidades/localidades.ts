import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { DataLocalidade } from "../../providers/dataLocalidade";
import { LocalidadeDetalhePage } from "./localidade-detalhe/localidade-detalhe";
import { LocalidadeModalPage } from "./localidade-modal/localidade-modal";


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
  public recordId        : any;
  public revisionId      : any;
  public localClienteId    : any;
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
              public alertCtrl  : AlertController,
              public DB         : DataLocalidade,
              public toastCtrl  : ToastController) {

  }

  ionViewWillEnter() {
      this.getTodos();
  }

  getTodos() {
    this.DB.recuperarTodos().then((data)=> {
        let existingData = Object.keys(data).length;
        if(existingData !== 0) {
          this.temDados 	 = true;
          this.localidades = data;
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

  viewDados(param) {
    this.navCtrl.push(LocalidadeDetalhePage, param);
  }
  
  insert() {
    this.navCtrl.push(LocalidadeModalPage);
  }

  delete(id) {
      let nome;
      let revId;
      this.DB.recuperarDados(id)
      .then((doc) => {
         nome         = doc[0].nome;
         revId 			    = doc[0].rev;
         return this.DB.removeDados(id, revId);
      })
      .then((data) => {
         this.hideForm 	= true;
         this.sendNotification(`${nome} Foi removido com sucesso da lista de clientes`);
         this.getTodos();
      })
      .catch((err) => {
         console.log(err);
      });
   }

   update(param){
      this.navCtrl.push(LocalidadeModalPage, param);
   }

    sendNotification(message)  : void {
      let notification = this.toastCtrl.create( {
         message 	: message,
         duration 	: 3000
      });
      notification.present();
   }

}
