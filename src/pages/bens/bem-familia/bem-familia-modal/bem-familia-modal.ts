import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from "@angular/forms";
import { Preloader } from "../../../../providers/preloader";
import { DataBemFamilia } from "../../../../providers/bens/data-bem-familia";
import { DataProduto } from "../../../../providers/data-produto";

/*
  Generated class for the BemFamiliaModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bem-familia-modal',
  templateUrl: 'bem-familia-modal.html'
})
export class BemFamiliaModalPage {

   public form             : any;
   public isEditable       : boolean = false;
   public temDados     : boolean = false;
   public pageTitle       : string;

   public dados            : any;
   public recordId         : any;
   public revisionId       : any;
   public itemCodigo       : any     = '';
   public itemNome         : any     = '';   
   public itemcodigo       : any     = '';
   public itemGrupoBem     : any     = [];
   public itemGrupoProduto : any     = [];
   public itemAtivo        : any;
   public produtos         : any;
  
   constructor(
      public navCtrl        : NavController,
      public navParams      : NavParams,
      private _FB 	        : FormBuilder,
      public viewCtrl       : ViewController,
      public toastCtrl      : ToastController,
      private _LOADER       : Preloader,
      private _DB           : DataBemFamilia,
      private _Prod         : DataProduto) {
        this._Prod.recuperarTodos().then((data)=> {
                  this.produtos = data;
        });
      this.form 		= _FB.group({
         'codigo' 		  : ['', Validators.minLength(10)],
         'name' 		    : ['', Validators.required],
         'grupoBem' 	  : ['', Validators.maxLength(4)],
         'grupoProduto'	: ['', Validators.required],
         "ativo"        : ["", Validators.required]
      });

      this.limparDados();

      if(navParams.get("key") && navParams.get("rev")){
        this.recordId 			= navParams.get("key");
        this.revisionId 		= navParams.get("rev");
        this.isEditable 			= true;
        this.select(this.recordId);
        this.pageTitle 		= 'Editando Item';
      }
      else{
          this.recordId 			= '';
          this.revisionId 		= '';
          this.isEditable 			= false;
          this.pageTitle 		= 'Novo Item';
      }

      if(navParams.get('isEditable')) {
          let item 		    = navParams.get('item'), k;

          this.itemCodigo       = item.codigo;
          this.itemNome	        = item.nome;
          this.itemGrupoBem     = item.grupoBem;
          this.itemGrupoProduto = item.grupoProduto;
          this.itemId           = item.id;

          for(k in movie.genres) {
             this.movieGenres.push(movie.genres[k].name);
          }


          for(k in movie.actors) {
             this.movieActors.push(movie.actors[k].name);
          }

          this.isEditable      = true;
      }
   }




   saveMovie(val)
   {
      this._LOADER.displayPreloader();

      let nome	    : string		= this.form.controls["name"].value,
	 	      codigo 	  : string 		= this.form.controls["codigo"].value,
          genres  	: any		    = this.form.controls["genres"].value,
          actors  	: any		    = this.form.controls["actors"].value,
          duration 	: string		= this.form.controls["duration"].value,
          grupoBem    	: string		= this.form.controls["grupoBem"].value,
          image     : string        = this.filmImage,
          types     : any           = [],
          people    : any           = [],
          k         : any;


      for(k in genres)
      {
         types.push({
            "name" : genres[k]
         });
      }


      for(k in actors)
      {
         people.push({
            "name" : actors[k]
         });
      }


      if(this.isEditable)
      {

         if(image !== this.movieImage)
         {
            this._DB.uploadImage(image)
            .then((snapshot : any) =>
            {
               let uploadedImage : any = snapshot.downloadURL;

               this._DB.updateDatabase(this.movieId,
               {
	              title    : title,
	              codigo  : codigo,
	              rating   : rating,
	              duration : duration,
	              image    : uploadedImage,
	              genres   : types,
	              actors   : people,
	              grupoBem     : grupoBem
	           })
               .then((data) =>
               {
                  this._LOADER.hidePreloader();
               });

            });
         }
         else
         {

           this._DB.updateDatabase(this.movieId,
           {
	          title    : title,
	          codigo  : codigo,
	          rating   : rating,
	          duration : duration,
	          genres   : types,
	          actors   : people,
	          grupoBem     : grupoBem
	       })
           .then((data) =>
           {
              this._LOADER.hidePreloader();
           });
	     }

      }
      else
      {
         this._DB.uploadImage(image)
         .then((snapshot : any) =>
         {
            let uploadedImage : any = snapshot.downloadURL;

            this._DB.addToDatabase({
	           title    : title,
	           image    : uploadedImage,
	           codigo  : codigo,
	           rating   : rating,
	           duration : duration,
	           genres   : types,
	           actors   : people,
	           grupoBem     : grupoBem
	        })
            .then((data) =>
            {
               this._LOADER.hidePreloader();
            });
         });

      }
      this.closeModal(true);
   }



   closeModal(val = null)
   {
      this.viewCtrl.dismiss(val);
   }

   limparDados() : void{
      this.itemNome       = "";
      this.itemCliente    = "";
      this.itemMunicipio	 = "";
      this.itemUF 	  	   = "";
      this.itemTipo 	  	 = "";
      this.itemLat        = "";
      this.itemLong    	 = "";
      this.itemAtivo 	   = "";
   }


}
