
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { AddPage } from '../pages/add/add';
import { ClientesPage } from '../pages/clientes/clientes';
import { ClienteDetalhePage } from '../pages/cliente-detalhe/cliente-detalhe';
import { ClienteModalPage } from '../pages/cliente-modal/cliente-modal';
import { LocalidadeDetalhePage } from '../pages/localidade-detalhe/localidade-detalhe';
import { LocalidadeModalPage } from '../pages/localidade-modal/localidade-modal';
import { LocalidadesPage } from '../pages/localidades/localidades';

import { Database } from '../providers/database';
import { Image } from '../providers/image';
import { DataCliente } from '../providers/dataCliente';
import { DataLocalidade } from "../providers/dataLocalidade";
import { BemPaiPage } from "../pages/bem-pai/bem-pai";
import { BemPaiModalPage } from "../pages/bem-pai-modal/bem-pai-modal";
import { BemPaiDetalhePage } from "../pages/bem-pai-detalhe/bem-pai-detalhe";
import { BemFilhoPage } from "../pages/bem-filho/bem-filho";
import { BemFilhoModalPage } from "../pages/bem-filho-modal/bem-filho-modal";
import { BemFilhoDetalhePage } from "../pages/bem-filho-detalhe/bem-filho-detalhe";
import { DataBemFilho } from "../providers/dataBem-filho";
import { DataBemPai } from "../providers/dataBem-pai";

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
    LocalidadeDetalhePage,
    BemPaiPage,
    BemPaiModalPage,
    BemPaiDetalhePage,
    BemFilhoPage,
    BemFilhoModalPage,
    BemFilhoDetalhePage
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
    LocalidadeDetalhePage,
    BemPaiPage,
    BemPaiModalPage,
    BemPaiDetalhePage,
    BemFilhoPage,
    BemFilhoModalPage,
    BemFilhoDetalhePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
              {provide: Database, useClass: Database},
              {provide: Image, useClass: Image},
              {provide: DataCliente, useClass: DataCliente},
              {provide: DataLocalidade, useClass: DataLocalidade},
              {provide: DataBemPai, useClass: DataBemPai},
              {provide: DataBemFilho, useClass: DataBemFilho},]
})
export class AppModule {}
