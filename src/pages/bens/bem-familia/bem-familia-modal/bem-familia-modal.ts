import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from "@angular/forms";
import { Preloader } from "../../../../providers/preloader";
import { DataBemFamilia } from "../../../../providers/bens/data-bem-familia";

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

   public dados            : any;
   public itemCodigo       : any     = '';
   public itemName         : any     = '';   
   public itemcodigo      : any     = '';
   public itemGrupoBem     : any     = [];
   public itemGrupoProduto : any     = [];

  
   constructor(
      public navCtrl        : NavController,
      public params         : NavParams,
      private _FB 	        : FormBuilder,
      public viewCtrl       : ViewController,
      private _LOADER       : Preloader,
      private _DB           : DataBemFamilia)
   {
      this.form 		= _FB.group({
         'codigo' 		: ['', Validators.minLength(10)],
         'grupoBem' 		: ['', Validators.maxLength(4)],
         'name' 		: ['', Validators.required],
         'duration'		: ['', Validators.required],
         'image'		: ['', Validators.required],
         'rating'		: ['', Validators.required],
         'genres' 		: ['', Validators.required],
         'actors' 		: ['', Validators.required]
      });

      this.dados = firebase.database().ref('films/');


      if(params.get('isEdited'))
      {
          let movie 		    = params.get('movie'), k;

          this.movieName	    = movie.title;
          this.movieDuration	= movie.duration;
          this.moviecodigo   	= movie.codigo;
          this.movieRating   	= movie.rating;
          this.moviegrupoBem    	= movie.grupoBem;
          this.movieImage       = movie.image;
          this.filmImage        = movie.image;
          this.movieId          = movie.id;


          for(k in movie.genres)
          {
             this.movieGenres.push(movie.genres[k].name);
          }


          for(k in movie.actors)
          {
             this.movieActors.push(movie.actors[k].name);
          }

          this.isEditable      = true;
      }
   }




   saveMovie(val)
   {
      this._LOADER.displayPreloader();

      let title	    : string		= this.form.controls["name"].value,
	 	  codigo 	: string 		= this.form.controls["codigo"].value,
  		  rating  	: number		= this.form.controls["rating"].value,
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



   selectImage()
   {
      this._IMG.selectImage()
      .then((data) =>
      {
         this.filmImage = data;
      });
   }

}
