import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { DataBemFamilia } from "../../../providers/bens/data-bem-familia";
import { Preloader } from "../../../providers/preloader";
import { BemFamiliaModalPage } from "./bem-familia-modal/bem-familia-modal";

/*
  Generated class for the BemFamilia page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bem-familia',
  templateUrl: 'bem-familia.html'
})
export class BemFamiliaPage {

  public temDados        : boolean = false;
  public isEdited        : boolean = false;
  public hideForm        : boolean = false;
  public pageTitle       : string;

  public dados    : any;

  public recordId        : any;
  public revisionId      : any;
  public localClienteId  : any;
  public localCliente    : any;
  public localNome       : any;
  public localTipo       : any;
  public localMunicipio  : any;
  public localUF         : any;
  public localLat        : any;
  public localLong       : any;
  public localAtivo      : any;
  public localidades     : any;

  constructor(public navCtrl    : NavController,
              private modalCtrl : ModalController,
              public navParams  : NavParams,
              public alertCtrl  : AlertController,
              public toastCtrl  : ToastController,
              private _LOADER   : Preloader,
              public _DB         : DataBemFamilia) {}

  ionViewWillEnter() {
      this.getTodos();
  }

  getTodos() {
    this._DB.recuperarTodos().then((data)=> {
        let existingData = Object.keys(data).length;
        if(existingData !== 0) {
          this.temDados 	 = true;
          this.localidades = data;
        }
        else {
          console.log("não obtemos nada!");
        }
    });
    this._LOADER.hidePreloader();
  }

  displayAlert(message) : void {
    let headsUp = this.alertCtrl.create( {
        title: 'Anteção!',
        subTitle: message,
        buttons: ['Consegui!']
    });
    headsUp.present();
  }

  

  addRecord()
   {
      let modal = this.modalCtrl.create(BemFamiliaModalPage);
      modal.onDidDismiss((data) =>
      {
         if(data)
         {
            this._LOADER.displayPreloader();
            this.getTodos();
         }
      });
      modal.present();
   }


   editMovie(movie)
   {
      let params = { movie: movie, isEdited: true },
          modal  = this.modalCtrl.create(BemFamiliaModalPage, params);

      modal.onDidDismiss((data) =>
      {
         if(data)
         {
            this._LOADER.displayPreloader();
            this.getTodos();
         }
      });
      modal.present();
   }



   
   delete(id) {
     this._LOADER.displayPreloader();
      let nome;
      let revId;
      this._DB.recuperarDados(id)
      .then((doc) => {
         nome         = doc[0].nome;
         revId 			    = doc[0].rev;
         return this._DB.delete(id, revId);
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

   sendNotification(message)  : void {
      let notification = this.toastCtrl.create( {
         message 	: message,
         duration 	: 3000
      });
      notification.present();
   }


}
