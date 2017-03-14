import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DataCliente } from "../../providers/dataCliente";
import { Image } from "../../providers/image";

/*
  Generated class for the ClienteModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cliente-modal',
  templateUrl: 'cliente-modal.html'
})
export class ClienteModalPage {

   public characterImage   : any;
   public recordId         : any;
   public revisionId       : any;
   public form                : FormGroup;
   public clienteNome         : any;
   public clienteNomeFantasia : any;
   public clienteSeguimento    : any;
   public clienteAtivo        : any;
   public clienteImage        : any;
   public isEdited            : boolean = false;
   public hideForm            : boolean = false;
   public pageTitle           : string;

   constructor(public navCtrl    : NavController,
               public navParams  : NavParams,
               public fb         : FormBuilder,
               public IMAGE      : Image,
               public DB         : DataCliente,
               public toastCtrl  : ToastController){

              this.form = fb.group({
                "nome"            : ["", Validators.required],
                "nomeFantasia"    : ["", Validators.required],
                "seguimento"      : ["", Validators.required],
                "image"           : ["", Validators.required],
                "ativo"           : ["", Validators.required]
              });

              this.resetFields();

              if(navParams.get("key") && navParams.get("rev")){
                  this.recordId 			= navParams.get("key");
                  this.revisionId 		= navParams.get("rev");
                  this.isEdited 			= true;
                  this.selectCliente(this.recordId);
                  this.pageTitle 		= 'Editando Cliente';
              }
              else{
                  this.recordId 			= '';
                  this.revisionId 		= '';
                  this.isEdited 			= false;
                  this.pageTitle 		= 'Novo Cliente';
              }
   }

   selectCliente(id){
      this.DB.retrieveCliente(id)
      .then((doc)=>{
         this.clienteNome         = doc[0].nome;
         this.clienteNomeFantasia	= doc[0].nomeFantasia;
         this.clienteSeguimento 	= doc[0].seguimento;
         this.clienteImage 			  = doc[0].image;
         this.characterImage 	    = doc[0].image;
         this.clienteAtivo 		  	= doc[0].ativo;
         this.recordId 				    = doc[0].id;
         this.revisionId 			    = doc[0].rev;
      });
   }

   saveCliente(){
      let nome	        : string		= this.form.controls["nome"].value,
          nomeFantasia 	: string 		= this.form.controls["nomeFantasia"].value,
          seguimento  	: string		= this.form.controls["seguimento"].value,
          image	  	    : string		= this.form.controls["image"].value,
          ativo	  	    : number		= this.form.controls["ativo"].value,
          revision	    : string 		= this.revisionId,
  	      id 		        : any 			= this.recordId;

      if(this.recordId !== ''){
         this.DB.updateCliente(id, nome, nomeFantasia, seguimento, ativo, image, revision)
         .then((data) =>{
            this.hideForm 			= true;
            this.sendNotification(`${nomeFantasia} Foi atualizado em na lista de clientes`);
         });
      }
      else{
         this.DB.addCliente(nome, nomeFantasia, seguimento, ativo, image)
         .then((data) =>{
            this.hideForm 			= true;
            this.resetFields();
            this.sendNotification(`${nomeFantasia} Foi adicionado a na lista de clientes`);
         });
      }
   }

   takePhotograph(){
      this.IMAGE.takePhotograph()
      .then((image)=>{
         this.characterImage 	= image.toString();
         this.clienteImage 		= image.toString();
      })
      .catch((err)=>{
         console.log(err);
      });
   }

   selectImage(){
      this.IMAGE.selectPhotograph()
      .then((image)=>{
         this.characterImage 	= image.toString();
         this.clienteImage 		= image.toString();
      })
      .catch((err)=>{
         console.log(err);
      });
   }

   resetFields() : void{
      this.clienteNomeFantasia  = "";
      this.clienteSeguimento    = "";
      this.clienteNome	        = "";
      this.clienteAtivo 	  	  = "";
      this.clienteImage	  	    = "";
      this.characterImage	      = "";
   }

   sendNotification(message)  : void{
      let notification = this.toastCtrl.create({
         message 	: message,
         duration 	: 3000
      });
      notification.present();
   }

}
