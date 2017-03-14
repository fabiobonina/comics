import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { DataCliente } from "../../providers/dataCliente";
import { ClienteModalPage } from "../cliente-modal/cliente-modal";

/*
  Generated class for the Clientes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html'
})
export class ClientesPage {

  public hasClientes   : boolean = false;
   public clientes      : any;

   constructor(	public navCtrl   : NavController,
               public alertCtrl  : AlertController,
               public toastCtrl  : ToastController,
               public DB         : DataCliente)
   {

   }



   ionViewWillEnter()
   {
      this.displayClientes();
   }



   displayClientes()
   {
      this.DB.retrieveClientes().then((data)=>
      {

         let existingData = Object.keys(data).length;
         if(existingData !== 0)
         {
            this.hasClientes 	= true;
            this.clientes 	= data;
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
          title: 'Anteção!',
          subTitle: message,
          buttons: ['Consegui!']
      });

      headsUp.present();
   }



   addCharacter()
   {
      this.navCtrl.push(ClienteModalPage);
   }
   viewCharacter(param)
   {
      this.navCtrl.push(ClienteModalPage, param);
   }

   verDetalhe(param)
   {
      this.navCtrl.push(ClienteModalPage, param);
   }
   addCliente()
   {
      this.navCtrl.push(ClienteModalPage);
   }


}
