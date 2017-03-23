import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from "ionic-angular";

/*
  Generated class for the Preloader provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Preloader {

  private loading : any;

   constructor( public http        : Http,
                public loadingCtrl : LoadingController)
   {
   }



   displayPreloader() : void
   {
      this.loading = this.loadingCtrl.create({
         content: 'Por favor, espere...'
      });

      this.loading.present();
   }



   hidePreloader() : void
   {
      this.loading.dismiss();
   }

}
