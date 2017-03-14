
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { AddPage } from '../pages/add/add';
import { AddClientePage } from "../pages/addCliente/addCliente";
import { ClientesPage } from '../pages/clientes/clientes';
import { ClienteDetalhePage } from '../pages/cliente-detalhe/cliente-detalhe';
import { ClienteModalPage } from '../pages/cliente-modal/cliente-modal';
import { LocalidadeDetalhePage } from '../pages/localidade-detalhe/localidade-detalhe';
import { LocalidadeModalPage } from '../pages/localidade-modal/localidade-modal';
import { LocalidadesPage } from '../pages/localidades/localidades';

import { Database } from '../providers/database';
import { Image } from '../providers/image';
import { DataCliente } from '../providers/dataCliente';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPage,
    ClientesPage,
    ClienteModalPage,
    ClienteDetalhePage,
    LocalidadesPage,
    LocalidadeModalPage,
    LocalidadeDetalhePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPage,
    ClientesPage,
    ClienteModalPage,
    ClienteDetalhePage,
    LocalidadesPage,
    LocalidadeModalPage,
    LocalidadeDetalhePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
              {provide: Database, useClass: Database},
              {provide:Image, useClass: Image},
              {provide: DataCliente, useClass: DataCliente},]
})
export class AppModule {}
