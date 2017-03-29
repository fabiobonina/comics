import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from "@angular/forms";
import { Preloader } from "../../../../providers/preloader";
import { DataBemFamilia } from "../../../../providers/bens/data-bem-familia";
import { DataBemFilho } from "../../../../providers/bens/data-bem-filho";

/*
  Generated class for the BemFilhoModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bem-filho-modal',
  templateUrl: 'bem-filho-modal.html'
})
export class BemFilhoModalPage {

  public form         : any;
   public isEditable   : boolean = false;
   public temDados     : boolean = false;
   public pageTitle    : string;

   public dados        : any = '';
   public itemId       : any = '';
   public itemRevId    : any = '';
   public itemTag      : any = '';
   public itemNome     : any = '';
   public itemBens     : any = [];
   public itemProdutos : any = [];
   public itemAtivo    : any = '';
  
   constructor(
      public navCtrl       : NavController,
      public navParams     : NavParams,
      public viewCtrl      : ViewController,
      public toastCtrl     : ToastController,
      public _FB 	         : FormBuilder,
      public _LOADER       : Preloader,
      public _DB           : DataBemFilho,
      public _DBFamilia    : DataBemFamilia) {
        
      this.form 		= _FB.group({
         'tag' 		  : ['', Validators.required],
         'nome' 		: ['', Validators.required],
         'bens' 	  : ['', Validators.required],
         'produtos'	: ['', Validators.required],
         "ativo"    : ['', Validators.required]
      });

      if(navParams.get('isEditable')){
        let item 		    = navParams.get('item'), k;

        this.itemId       = item._id;
        this.itemRevId 	  = item._rev;
        this.itemTag  	  = item.tag;
        this.itemNome 	  = item.nome;
        this.itemAtivo    = item.ativo;

        for(k in item.bens) {
             this.itemBens.push(item.bens[k].nome);
        }

        for(k in item.produtos) {
            this.itemProdutos.push(item.produtos[k].nome);
        } 

          this.isEditable  = true;
      }
            
   }

   save(value)
   {
      this._LOADER.displayPreloader();

      let nome	   : string		= this.form.controls["nome"].value,
          tag 	   : string 	= this.form.controls["tag"].value,
	 	      bens  	 : any		  = this.form.controls["bens"].value,
          produtos : any		  = this.form.controls["produtos"].value,
          ativo 	 : boolean	= this.form.controls["ativo"].value,
          id       : any     	= this.itemId,
  	      revision : string 	= this.itemRevId,
          types    : any      = [],
          prod     : any      = [],
          k        : any;

      for(k in bens) {
         types.push({
            "nome" : bens[k]
         });
      }

      for(k in produtos) {
         prod.push({
            "nome" : produtos[k]
         });
      }

      var bemFamilia;

      if(this.isEditable) {
        bemFamilia 	= {
            _id       : id,
            _rev 		  : revision,
	          nome      : nome,
            tag       : tag,
	          bens      : types,
	          produtos  : prod,
	          ativo     : ativo
          };
         this._DB.update(bemFamilia)
           .then((data) =>
           {
              this._LOADER.hidePreloader();
           });
      }
      else {
        var timeStamp 	= new Date().toISOString();
            bemFamilia = {
              _id 		 : timeStamp,
              nome     : nome,
              tag      : tag,
              bens     : types,
              produtos : prod,
              ativo    : ativo
            };
         this._DB.add(bemFamilia)
        .then((data) =>
        {
            this._LOADER.hidePreloader();
        });
      }
      this.closeModal(true);
   }

   closeModal(val = null) {
      this.viewCtrl.dismiss(val);
   }

}
