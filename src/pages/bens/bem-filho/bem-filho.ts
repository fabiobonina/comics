import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform, AlertController, ToastController } from 'ionic-angular';
import { Preloader } from "../../../providers/preloader";
import { DataBemFilho } from "../../../providers/bens/data-bem-filho";
import { DataBemFamilia } from "../../../providers/bens/data-bem-familia";
import { BemFilhoModalPage } from "./bem-filho-modal/bem-filho-modal";

/*
  Generated class for the BemFilho page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bem-filho',
  templateUrl: 'bem-filho.html'
})
export class BemFilhoPage {

  public temDados       : boolean = false;
  public isEditable     : boolean = false;
  public hideForm       : boolean = false;
  public dados          : any = '';

  constructor(public navCtrl    : NavController,
              private modalCtrl : ModalController,
              public navParams  : NavParams,
              private platform  : Platform,
              public alertCtrl  : AlertController,
              public toastCtrl  : ToastController,
              private _LOADER   : Preloader,
              public _DB        : DataBemFilho,
              public _DBFamilia : DataBemFamilia) {}

  ionViewWillEnter() {
      this.getTodos();
  }

  getTodos() {
    this._DB.getTodos().then((data)=> {
        let existingData = Object.keys(data).length;
        if(existingData !== 0) {
          this.temDados 	 = true;
          this.dados = data;
        }
        else {
          console.log("não obtemos nada!");
        }
    });
    console.log(this.dados);
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

  add() {
      let modal = this.modalCtrl.create(BemFilhoModalPage);
      modal.onDidDismiss((data) => {
         if(data) {
            this._LOADER.displayPreloader();
            this.getTodos();
         }
      });
      modal.present();
   }

   edit(item) {
      let params = { item: item, isEditable: true },
          modal  = this.modalCtrl.create(BemFilhoModalPage, params);

      modal.onDidDismiss((data) => {
         if(data) {
            this._LOADER.displayPreloader();
            this.getTodos();
         }
      });
      modal.present();
   }

   delete(item) {
     this._LOADER.displayPreloader();
      let nome = item.nome;
      this._DB.delete(item._id, item._rev)
      .then((data) => {
         this.hideForm 	= true;
         this.sendNotification(`${nome} Foi removido com sucesso`);
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
