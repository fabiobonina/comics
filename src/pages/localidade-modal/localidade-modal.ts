import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DataLocalidade } from "../../providers/dataLocalida";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

/*
  Generated class for the LocalidadeModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-localidade-modal',
  templateUrl: 'localidade-modal.html'
})
export class LocalidadeModalPage {

  public form            : FormGroup;
  public recordId        : any;
  public revisionId      : any;
  public localCliente    : any;
  public localNome       : any;
  public localTipo       : any;
  public localMunicipio  : any;
  public localUF         : any;
  public localLatitude   : any;
  public localLongitude  : any;
  public localAtivo      : any;
  public isEdited        : boolean = false;
  public hideForm        : boolean = false;
  public pageTitle       : string;

  constructor(public navCtrl    : NavController,
              public navParams  : NavParams,
              public fb         : FormBuilder,
              public DB         : DataLocalidade,
              public toastCtrl  : ToastController) {

                this.form = fb.group({
                "nome"      : ["", Validators.required],
                "cliente"   : ["", Validators.required],
                "tipo"      : ["", Validators.required],
                "municipio" : ["", Validators.required],
                "uf"        : ["", Validators.required]
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
        this.localCliente   = doc[0].cliente;
        this.localNome      = doc[0].nome;
        this.localTipo      = doc[0].tipo;
        this.localMunicipio = doc[0].municipio;
        this.localUF	      = doc[0].uf;
        this.localLatitude 	= doc[0].latitude;
        this.localLongitude = doc[0].longitude;
        this.localAtivo 		= doc[0].ativo;
        this.recordId 			= doc[0].id;
        this.revisionId 		= doc[0].rev;
      });
   }

   save(){
      let nome	        : string		= this.form.controls["nome"].value,
          cliente 	    : string 		= this.form.controls["cliente"].value,
          tipo  	      : string		= this.form.controls["tipo"].value,
          municipio	  	: string		= this.form.controls["municipio"].value,
          uf	         	: string		= this.form.controls["municipio"].value,
          ativo	  	    : number		= 0,
          revision	    : string 		= this.revisionId,
  	      id 		        : any 			= this.recordId;

      if(this.recordId !== ''){
         this.DB.updateDados(id, nome, cliente, tipo, ativo, municipio, uf, revision)
         .then((data) =>{
            this.hideForm 			= true;
            this.sendNotification(`${nome} Foi atualizado em na lista de clientes`);
         });
      }
      else{
         this.DB.addDados(nome, cliente, tipo, ativo, municipio, uf)
         .then((data) =>{
            this.hideForm 			= true;
            this.limparDados();
            this.sendNotification(`${nome} Foi adicionado a na lista de clientes`);
         });
      }
   }

   limparDados() : void{
      this.localNome       = "";
      this.localCliente    = "";
      this.localMunicipio	 = "";
      this.localUF 	  	   = "";
      this.localTipo 	  	 = "";
      this.localLatitude   = "";
      this.localLongitude	 = "";
      this.localAtivo 	   = "";
   }

   sendNotification(message)  : void{
      let notification = this.toastCtrl.create({
         message 	: message,
         duration 	: 3000
      });
      notification.present();
   }

}
