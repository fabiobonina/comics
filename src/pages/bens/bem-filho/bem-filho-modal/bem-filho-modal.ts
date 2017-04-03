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
   public itemAtivo       : any = '';
  
   constructor(
      public navCtrl       : NavController,
      public navParams     : NavParams,
      public viewCtrl      : ViewController,
      public toastCtrl     : ToastController,
      public _FB 	         : FormBuilder,
      public _LOADER       : Preloader,
      public _DB           : DataBemFilho,
      public _DBFamilia    : DataBemFamilia) {
      
        this._DBFamilia.getTodos().then((data)=> {
            this.familias = data;
        });
          
        this.form 		= _FB.group({
          'familiaId' 	: ['', Validators.required],
          'fabricante' 	: ['', Validators.required],
          'modelo' 	    : ['', Validators.required],
          'capacidade'	: ['', Validators.required],
          'nSerie'	    : ['', Validators.required],
          'dtFabric'	  : ['', Validators.required],
          "ativo"       : ['', Validators.required]
        });

        if(navParams.get('isEditable')){
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
          this.itemNSerie      = item.nSerie;
          this.itemAtivo       = item.ativo;

          this.isEditable     = true;
        }
            
   }

   save(value) {
      this._LOADER.displayPreloader();

      let familiaId	 : string		= this.form.controls["familiaId"].value,
          fabricante : string 	= this.form.controls["fabricante"].value,
	 	      modelo  	 : any		  = this.form.controls["modelo"].value,
          capacidade : any		  = this.form.controls["capacidade"].value,
          nSerie     : any		  = this.form.controls["nSerie"].value,
          dtFabric   : any		  = this.form.controls["dtFabric"].value,
          ativo 	   : boolean	= this.form.controls["ativo"].value,
          id         : any     	= this.itemId,
  	      revision   : string 	= this.itemRevId;

      //Coletar os dados
      this._DBFamilia.recuperarDados(familiaId)
        .then((doc)=>{
          let familiaNome   : string = doc[0].nome,
              familiaTag    : string = doc[0].tag;
        console.log(familiaNome);
      
        var bemFilho;

        if(this.isEditable) {
          bemFilho 	= {
              _id         : id,
              _rev 		    : revision,
              familiaId   : familiaId,
              familiaNome : familiaNome,
              familiaTag  : familiaTag,
              fabricante  : fabricante,
              modelo      : modelo,
              capacidade  : capacidade,
              nSerie      : nSerie,
              dtFabric    : dtFabric,
              ativo       : ativo
            };
          this._DB.update(bemFilho)
            .then((data) =>
            {
                this._LOADER.hidePreloader();
            });
        }
        else {
          var timeStamp 	= new Date().toISOString();
              bemFilho = {
                _id 		    : timeStamp,
                familiaId   : familiaId,
                familiaNome : familiaNome,
                familiaTag  : familiaTag,
                fabricante  : fabricante,
                modelo      : modelo,
                capacidade  : capacidade,
                nSerie      : nSerie,
                dtFabric    : dtFabric,
                ativo       : ativo
              };
          this._DB.add(bemFilho)
          .then((data) =>
          {
              this._LOADER.hidePreloader();
          });
        }
        this.closeModal(true);
      });
   }

   closeModal(value = null) {
      this.viewCtrl.dismiss(value);
   }

}
