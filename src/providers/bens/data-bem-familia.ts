import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { AlertController } from "ionic-angular";
import PouchDB from 'pouchdb';

/*
  Generated class for the DataBemFamilia provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataBemFamilia {

    public _DB 		    : any;
    private success 	: boolean = true;
    private _remoteDB 	: any;
    private _syncOpts 	: any;
    private _nomeDB     : string = 'bens_familia';

    //data: any;

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
         include_docs  : true,
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

   add(data) {
      var bemFamilia = data;
      return new Promise(resolve => {
         this._DB.put(bemFamilia).catch((err) => {
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
      var bemFamilia 	= data;
      return new Promise(resolve => {
         this._DB.put(bemFamilia)
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
            item.push( doc );

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
                    id 		      : item._id,
                    rev		      : item._rev,
                    nome		    : item.nome,
                    tag         : item.tag,
                    bens        : item.bens,
                    produtos    : item.produtos,
                    ativo		    : item.ativo
               });
            }

            resolve(items);
         });
      });
   }

   getTodos() {

    //if (this.data) {
    //  return Promise.resolve(this.data);
    //}
  
    return new Promise(resolve => {
  
      this._DB.allDocs({ include_docs: true }).then((result) => {
        let data = [],
            docs = result.rows.map((row) => {
            data.push(row.doc);
        });
        resolve(data);
        this._DB.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          //this.handleChange(change);
        });
  
      }).catch((error) => {
  
        console.log(error);
  
      }); 
  
    });
 
  }

  /*handleChange(change){
    let changedDoc = null;
    let changedIndex = null;
  
    this.data.forEach((doc, index) => {
  
      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }
  
    });
  
    //A document was deleted
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    } 
    else {
  
      //A document was updated
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      } 
  
      //A document was added
      else {
        this.data.push(change.doc); 
      }
  
    }
  }*/

   delete(id, rev) {
      return new Promise(resolve => {
         var bemFamilia   = { _id: id, _rev: rev };

         this._DB.remove(bemFamilia)
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