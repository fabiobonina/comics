import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DataCliente } from "../../providers/dataCliente";

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


   public form                : FormGroup;
   public recordId            : any;
   public revisionId          : any;
   public clienteNome         : any;
   public clienteNomeFantasia : any;
   public clienteSeguimento   : any;
   public clienteAtivo        : any;
   public isEdited            : boolean = false;
   public hideForm            : boolean = false;
   public pageTitle           : string;

   constructor(public navCtrl    : NavController,
               public navParams  : NavParams,
               public fb         : FormBuilder,
               public DB         : DataCliente,
               public toastCtrl  : ToastController){

              this.form = fb.group({
                "nome"            : ["", Validators.required],
                "nomeFantasia"    : ["", Validators.required],
                "seguimento"      : ["", Validators.required],
                "ativo"           : [""]
              });

              this.limparDados();

              if(navParams.get("key") && navParams.get("rev")){
                  this.recordId 			= navParams.get("key");
                  this.revisionId 		= navParams.get("rev");
                  this.isEdited 			= true;
                  this.select(this.recordId);
                  this.pageTitle 		= 'Editando Cliente';
              }
              else{
                  this.recordId 			= '';
                  this.revisionId 		= '';
                  this.isEdited 			= false;
                  this.pageTitle 		= 'Novo Cliente';
              }
   }

   select(id){
      this.DB.recuperarDados(id)
      .then((doc)=>{
         this.clienteNome         = doc[0].nome;
         this.clienteNomeFantasia	= doc[0].nomeFantasia;
         this.clienteSeguimento 	= doc[0].seguimento;
         this.clienteAtivo 		  	= doc[0].ativo;
         this.recordId 				    = doc[0].id;
         this.revisionId 			    = doc[0].rev;
      });
   }

   save(){
      let nome	        : string		= this.form.controls["nome"].value,
          nomeFantasia 	: string 		= this.form.controls["nomeFantasia"].value,
          seguimento  	: string		= this.form.controls["seguimento"].value,
          ativo	  	    : boolean		= this.form.controls["ativo"].value,
          revision	    : string 		= this.revisionId,
  	      id 		        : any 			= this.recordId;

      if(this.recordId !== ''){
         this.DB.updateDados(id, nome, nomeFantasia, seguimento, ativo, revision)
         .then((data) =>{
            this.hideForm 			= true;
            this.sendNotification(`${nomeFantasia} Foi atualizado em na lista de clientes`);
         });
      }
      else{
         this.DB.addDados(nome, nomeFantasia, seguimento, ativo)
         .then((data) =>{
            this.hideForm 			= true;
            this.limparDados();
            this.sendNotification(`${nomeFantasia} Foi adicionado a na lista de clientes`);
         });
      }
   }

   limparDados() : void{
      this.clienteNomeFantasia  = "";
      this.clienteSeguimento    = "";
      this.clienteNome	        = "";
      this.clienteAtivo 	  	  = "";
   }

   sendNotification(message)  : void{
      let notification = this.toastCtrl.create({
         message 	: message,
         duration 	: 3000
      });
      notification.present();
   }

}
