import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataLocalidade } from "../../../providers/dataLocalidade";
import { DataCliente } from "../../../providers/dataCliente";


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
  public clientes        : any;
  public recordId        : any;
  public revisionId      : any;
  public localClienteId  : any;
  public localCliente    : any;
  public localNome       : any;
  public localTipo       : any;
  public localMunicipio  : any;
  public localUF         : any;
  public localLat        : any;
  public localLong       : any;
  public localAtivo      : any;
  public isEdited        : boolean = false;
  public hideForm        : boolean = false;
  public pageTitle       : string;
  public clienteNome     : string;

  constructor(public navCtrl    : NavController,
              public navParams  : NavParams,
              public fb         : FormBuilder,
              public DB         : DataLocalidade,
              public daoCliente : DataCliente,
              public toastCtrl  : ToastController) {

                this.daoCliente.recuperarTodos().then((data)=> {
                  this.clientes = data;
                });
                this.form = fb.group({
                "nome"      : ["", Validators.required],
                "clienteId"   : ["", Validators.required],
                "tipo"      : ["", Validators.required],
                "municipio" : ["", Validators.required],
                "uf"        : ["", Validators.required],
                "ativo"     : ["", Validators.required]
              });

              this.limparDados();

              if(navParams.get("key") && navParams.get("rev")){
                  this.recordId 			= navParams.get("key");
                  this.revisionId 		= navParams.get("rev");
                  this.isEdited 			= true;
                  this.select(this.recordId);
                  this.pageTitle 		= 'Editando Item';
              }
              else{
                  this.recordId 			= '';
                  this.revisionId 		= '';
                  this.isEdited 			= false;
                  this.pageTitle 		= 'Novo Item';
              }
            }

  select(id){
      this.DB.recuperarDados(id)
      .then((doc)=>{
        this.localNome      = doc[0].nome;
        this.localClienteId = doc[0].clienteId;
        this.localCliente   = doc[0].cliente;
        this.localTipo      = doc[0].tipo;
        this.localMunicipio = doc[0].municipio;
        this.localUF	      = doc[0].uf;
        this.localLat   		= doc[0].lat;
        this.localLong   		= doc[0].long;
        this.localAtivo 		= doc[0].ativo;
        this.recordId 			= doc[0].id;
        this.revisionId 		= doc[0].rev;
      });
   }

   save(){
      
      let nome	    : string	= this.form.controls["nome"].value,
          clienteId : string 	= this.form.controls["clienteId"].value,
          tipo  	  : string	= this.form.controls["tipo"].value,
          municipio : string	= this.form.controls["municipio"].value,
          uf	      : string	= this.form.controls["uf"].value,
          ativo	  	: boolean	= this.form.controls["ativo"].value,
          revision	: string 	= this.revisionId,
  	      id 		    : any 		= this.recordId;
          
          
      //Coletar os dados Nome do Cliente
      this.daoCliente.recuperarDados(clienteId)
        .then((doc)=>{
          let cliente   : string = doc[0].nomeFantasia;
        console.log(cliente);
      if(this.recordId !== ''){
         this.DB.updateDados(id, nome, clienteId, cliente, tipo, municipio, uf, ativo, revision)
         .then((data) =>{
            this.hideForm 			= true;
            this.sendNotification(`${nome} Foi atualizado em na lista de clientes`);
         });
      }
      else{
         this.DB.addDados(nome, clienteId, cliente, tipo, municipio, uf, ativo)
         .then((data) =>{
            this.hideForm 			= true;
            this.limparDados();
            this.sendNotification(`${nome} Foi adicionado a na lista de clientes`);
         });
      }
      });
   }

   limparDados() : void{
      this.localNome       = "";
      this.localClienteId  = "";
      this.localCliente    = "";
      this.localMunicipio	 = "";
      this.localUF 	  	   = "";
      this.localTipo 	  	 = "";
      this.localLat        = "";
      this.localLong    	 = "";
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
