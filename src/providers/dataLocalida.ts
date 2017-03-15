import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';

/*
  Generated class for the DataCliente provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataLocalidade {

    public _DB 		    : any;
    private success 	: boolean = true;
    private _remoteDB 	: any;
    private _syncOpts 	: any;
    private _nomeDB     : string = 'localidades';

  constructor(public http: Http,
              public alertCtrl : AlertController) {
      this.inicializarDB();
   }

   inicializarDB(){
        this._DB 			= new PouchDB(this._nomeDB);
        this._remoteDB 		= 'http://192.168.10.186:5984/' + this._nomeDB;
       //this._remoteDB 		= 'http://localhost:5984/' + this._nomeDB;
        this._syncOpts 		= { live 	  :true,
                                retry 	  :true,
                                continuous:true };
        this._DB.sync(this._remoteDB, this._syncOpts)
        .on('change', (info) =>
        {
            console.log('Manipulação de alterações de sincronização');
            console.dir(info);
        })
        .on('paused', (info) =>
        {
            console.log('Gerenciando a pausa de sincronização');
            console.dir(info);
        })
        .on('active', (info) =>
        {
            console.log('Manipulando a reativação de sincronização');
            console.dir(info);
        })
        .on('denied', (err) =>
        {
            console.log('Gerenciando a sincronização negada');
            console.dir(err);
        })
        .on('complete', (info) =>
        {
            console.log('Gerenciando a sincronização concluída');
            console.dir(info);
        })
        .on('error', (err)=>
        {
            console.log('Gerenciando o erro de sincronização');
            console.dir(err);
        });
    }

   processarSync() {
      this._DB.changes({
         since 		     : 'now',
         live 		     : true,
         include_docs 	 : true,
         attachments 	 : true
      })
      .on('change', (change) =>
      {
         // handle change
         console.log('Manuseando a mudança');
         console.dir(change);
      })
      .on('complete', (info) =>
      {
         // changes() was canceled
         console.log('Alterações concluídas');
         console.dir(info);
      })
      .on('error',  (err) =>
      {
         console.log('Erro de alterações');
         console.log(err);
      });
   }

   addDados(nome, cliente, tipo, municipio, uf, ativo) {
      var timeStamp 	= new Date().toISOString(),
          localidade 	= {
             _id 		: timeStamp,
             nome 		: nome,
             cliente 	: cliente,
             tipo 	    : tipo,
             municipio 	: municipio,
             uf 	    : uf,
             ativo      : ativo
          };

      return new Promise(resolve => {
         this._DB.put(nome).catch((err) => {
            console.log('error is: ' + err);
            this.success = false;
         });
         if(this.success) {
            this.processarSync();
            resolve(true);
         }

      });
   }

   updateDados(id, nome, cliente, tipo, municipio, uf, ativo, revision) {
      var lolicadade 	= {
             _id        : id,
             _rev 		: revision,
             nome 		: nome,
             cliente 	: cliente,
             tipo 	    : tipo,
             municipio 	: municipio,
             uf 	    : uf,
             ativo      : ativo
          };

      return new Promise(resolve => {
         this._DB.put(nome)
         .catch((err) => {
            console.log('error is: ' + err);
            this.success = false;
         });

         if(this.success) {
            this.processarSync();
            resolve(true);
         }
      });
   }

   recuperarDados(id) {
      return new Promise(resolve => {
         this._DB.get(id) 
         .then((doc)=> {
            var item 			= [];
            item.push( {
                id 		     : id,
                rev		     : doc._rev,
                nome		 : doc.nome,
                nomeFantasia : doc.nomeFantasia,
                seguimento   : doc.seguimento,
                ativo		 : doc.ativo,
            });

            resolve(item);
         })
      });
   }

   recuperarTodos() {
      return new Promise(resolve => {
         this._DB.allDocs({include_docs: true, descending: true}, function(err, doc) {
            let k,
                items 	= [],
                row 	= doc.rows;

            for(k in row) {
               var item 		     = row[k].doc;

               items.push( {
                  id 		    : item._id,
                  rev		    : item._rev,
                  nome	        : item.nome,
                  nomeFantasia	: item.nomeFantasia,
                  seguimento	: item.seguimento,
                  ativo	        : item.ativo
               });
            }

            resolve(items);
         });
      });
   }

   removeDados(id, rev) {
      return new Promise(resolve => {
         var cliente   = { _id: id, _rev: rev };

         this._DB.remove(cliente)
         .catch((err) => {
            console.log('error is: ' + err);
            this.success = false;
         });

         if(this.success) {
            resolve(true);
         }
      });
   }

   errorManipulandor(err) {
      let headsUp = this.alertCtrl.create({
          title: 'Atenção!',
          subTitle: err,
          buttons: ['Consegui!']
      });

      headsUp.present();
   }

}
