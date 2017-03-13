import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { Database } from '../../providers/database';
import { AddPage } from '../../pages/add/add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   public hasComics   : boolean = false;
   public comics      : any;

   constructor(	public navCtrl   : NavController,
               public alertCtrl  : AlertController,
               public toastCtrl  : ToastController,
               public DB         : Database)
   {

   }



   ionViewWillEnter()
   {
      this.displayComics();
   }



   displayComics()
   {
      this.DB.retrieveComics().then((data)=>
      {

         let existingData = Object.keys(data).length;
         if(existingData !== 0)
         {
            this.hasComics 	= true;
            this.comics 	= data;
         }
         else
         {
            console.log("we get nada!");
         }

      });
   }



   displayAlert(message) : void
   {
      let headsUp = this.alertCtrl.create({
          title: 'Heads Up!',
          subTitle: message,
          buttons: ['Got It!']
      });

      headsUp.present();
   }



   addCharacter()
   {
      this.navCtrl.push(AddPage);
   }



   viewCharacter(param)
   {
      this.navCtrl.push(AddPage, param);
   }

}