import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from "ionic-angular";
import PouchDB from 'pouchdb';

@Injectable()
export class DataBemFilho {

  public _DB 		    : any;
  private success 	: boolean = true;
  private _remoteDB 	: any;
  private _syncOpts 	: any;
  private _nomeDB     : string = 'bens_filho';

  constructor(public http      : Http,
              public alertCtrl : AlertController) {
      this.inicializarDB();
   }

   inicializarDB(){
       this._DB 			  = new PouchDB(this._nomeDB);
       this._remoteDB 	= 'http://192.168.10.186:5984/' + this._nomeDB;
       //this._remoteDB = 'http://localhost:5984/' + this._nomeDB;
        this._syncOpts 	= { live 	    :true,
                            retry 	  :true,
                            continuous:true };
        this._DB.sync(this._remoteDB, this._syncOpts)
        .on('change', (info) => {
            console.log('Manipulação de alterações de sincronização');
            console.dir(info);
        })
        .on('paused', (info) => {
            console.log('Gerenciando a pausa de sincronização');
            console.dir(info);
        })
        .on('active', (info) => {
            console.log('Manipulando a reativação de sincronização');
            console.dir(info);
        })
        .on('denied', (err) => {
            console.log('Gerenciando a sincronização negada');
            console.dir(err);
        })
        .on('complete', (info) => {
            console.log('Gerenciando a sincronização concluída');
            console.dir(info);
        })
        .on('error', (err)=> {
            console.log('Gerenciando o erro de sincronização');
            console.dir(err);
        });
    }

   processarSync() {
      this._DB.changes({
         since 		     : 'now',
         live 		     : true,
         include_docs  : true,
         attachments 	 : true
      })
      .on('change', (change) => {
         // handle change
         console.log('Manuseando a mudança');
         console.dir(change);
      })
      .on('complete', (info) => {
         // changes() was canceled
         console.log('Alterações concluídas');
         console.dir(info);
      })
      .on('error',  (err) => {
         console.log('Erro de alterações');
         console.log(err);
      });
   }

   add(data) {
      var bemFilho = data;
      return new Promise(resolve => {
         this._DB.put(bemFilho).catch((err) => {
            console.log('error is: ' + err);
            this.success = false;
         });
         if(this.success) {
            this.processarSync();
            resolve(true);
         }
      });
   }

   update(data) {
      var bemFilho 	= data;
      return new Promise(resolve => {
         this._DB.put(bemFilho)
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
                id 		    : id,
                rev		    : doc._rev,
                nome		  : doc.nome,
                tag       : doc.tag,
                bens      : doc.bens,
                produtos  : doc.produtos,
                ativo		  : doc.ativo
            });
            resolve(item);
         })
      });
   }

   getTodos() {
    return new Promise(resolve => {
      this._DB.allDocs({ include_docs: true }).then((result) => {
        let data = [],
            docs = result.rows.map((row) => {
            data.push(row.doc);
        });
        resolve(data);
        this._DB.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
        });
      }).catch((error) => {
          console.log(error);
      }); 
    });
  }

  delete(id, rev) {
      return new Promise(resolve => {
         var bemFilho   = { _id: id, _rev: rev };

         this._DB.remove(bemFilho)
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
