import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DataBemPai } from "../../../../providers/bens/data-bem-pai";

/*
  Generated class for the BemPaiDetalhe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bem-pai-detalhe',
  templateUrl: 'bem-pai-detalhe.html'
})
export class BemPaiDetalhePage {

   public form         : any;
   public isEditable   : boolean = false;
   public temDados     : boolean = false;
   public pageTitle    : string;
   
   public familias        : any = '';
   public dados           : any = '';
   
   public itemId          : any = '';
   public itemRevId       : any = '';
   public itemFamiliaId   : any = '';
   public itemFamiliaTag  : any = '';
   public itemFamiliaNome : any = '';
   public itemFabricante  : any = '';
   public itemModelo      : any = '';
   public itemCapacidade  : any = '';
   public itemNSerie      : any = '';
   public itemDtFabric    : any = '';
   public itemNPatrimonio : any = '';
   public itemAtivo       : boolean = true;

  constructor(public navCtrl    : NavController,
              public navParams  : NavParams,
              public toastCtrl  : ToastController,
              public DB         : DataBemPai) {
                if(navParams.get('item')) {
                  let item 		    = navParams.get('item');

                  this.itemId          = item._id;
                  this.itemRevId 	     = item._rev;
                  this.itemFamiliaId   = item.familiaId;
                  this.itemFamiliaTag  = item.familiaTag;
                  this.itemFamiliaNome = item.familiaNome;
                  this.itemFabricante  = item.fabricante;
                  this.itemModelo      = item.modelo;
                  this.itemCapacidade  = item.capacidade;
                  this.itemNSerie      = item.nSerie;
                  this.itemDtFabric    = item.dtFabric;
                  this.itemNPatrimonio = item.nPatrimonio;
                  this.itemAtivo       = item.ativo;
                }
              }

  select(id) {
      this.DB.recuperarDados(id)
      .then((doc)=> {

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
