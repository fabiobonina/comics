import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ModalController, Platform } from 'ionic-angular';
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
  public isEditable      : boolean = false;
  public hideForm        : boolean = false;
  public pageTitle       : string;

  public dados        : any = '';
  public itemId       : any = '';
  public itemRevId    : any = '';
  public itemTag      : any = '';
  public itemNome     : any = '';
  public itemBens     : any = '';
  public itemProdutos : any = '';
  public itemAtivo    : any = '';

  constructor(public navCtrl    : NavController,
              private modalCtrl : ModalController,
              public navParams  : NavParams,
              private platform  : Platform,
              public alertCtrl  : AlertController,
              public toastCtrl  : ToastController,
              private _LOADER   : Preloader,
              public _DB         : DataBemFamilia) {}

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
      let modal = this.modalCtrl.create(BemFamiliaModalPage);
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
          modal  = this.modalCtrl.create(BemFamiliaModalPage, params);

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
      this._DB.delete(item.id, item.revId)
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
